# modules/module_useragent/plugin.py

from core.interface_v1 import PluginInterface

INTENT_MAP = {
    "สร้างพล็อต": "generate_plot",
    "สร้างทรีตเมนต์": "generate_treatment",
    "บทพูด": "generate_dialog",
    "สำนวน": "refine_text",
    "แก้ไข": "refine_text",
    "ส่งออก": "export",
}

class Plugin(PluginInterface):
    def metadata(self):
        return {
            "name": "UserAgent",
            "description": "วิเคราะห์ intent จากข้อความผู้ใช้และเรียกใช้ปลั๊กอินที่เหมาะสม",
            "version": "1.0"
        }

    def validate_input(self, input_data):
        return "message" in input_data and "memory" in input_data

    def detect_intent(self, message):
        for keyword, intent in INTENT_MAP.items():
            if keyword in message:
                return intent
        return "unknown"

    def run(self, *args, **kwargs):
        input_data = kwargs.get("input_data")
        message = input_data.get("message", "").lower()
        memory = input_data.get("memory", {})

        intent = self.detect_intent(message)

        if intent == "generate_plot":
            # Pipeline: PlotEngine -> Refiner -> TreatmentGen
            from modules.module_plotengine.plugin import Plugin as PlotEngine
            from modules.module_refiner.plugin import Plugin as Refiner
            from modules.module_treatmentgen.plugin import Plugin as TreatmentGen
            
            # Step 1: สร้างโครงสร้างพล็อต
            plot_engine_input = {
                "template_name": memory.get("template", "slowburn_3act"),
                "user_data": memory.get("user_data", {})
            }
            plot_result = PlotEngine().run(plot_engine_input)
            
            # Step 2: ขัดเกลาเนื้อหา
            refiner_input = {
                "scenes": plot_result["scenes"],
                "style_mode": memory.get("style_mode", "ละมุน")
            }
            refiner_result = Refiner().run(refiner_input)
            
            # Step 3: สร้างทรีตเมนต์
            treatment_input = {
                "title": memory.get("title", "untitled"),
                "scenes": refiner_result["scenes"]
            }
            treatment_result = TreatmentGen().run(treatment_input)

            return {
                "reply": "ผมสร้างพล็อตและทรีตเมนต์ให้เรียบร้อยแล้วครับ ✅",
                "treatment": treatment_result["treatment"],
                "scenes": refiner_result["scenes"]
            }
        
        elif intent == "generate_dialog":
            from modules.module_dialoggen.plugin import Plugin as DialogGen
            scenes = memory.get("scenes", [])
            result = DialogGen().run({"scenes": scenes})
            return {
                "reply": "ผมใส่บทพูดให้ฉากนี้แล้วครับ ลองดูเลยครับ",
                "dialog": result
            }

        elif intent == "refine_text":
            from modules.module_refiner.plugin import Plugin as Refiner
            scenes = memory.get("scenes", [])
            result = Refiner().run({"scenes": scenes, "style_mode": memory.get("style_mode", "ละมุน")})
            return {
                "reply": "ผมปรับปรุงเนื้อหาและสำนวนของฉากให้แล้วครับ",
                "scenes": result["scenes"]
            }
            
        elif intent == "export":
            from modules.module_exporter.plugin import Plugin as Exporter
            title = memory.get("title", "untitled")
            scenes = memory.get("scenes", [])
            output_format = memory.get("export_format", "txt")
            result = Exporter().run({"title": title, "scenes": scenes, "format": output_format})
            return {
                "reply": f"ส่งออกฉากทั้งหมดเรียบร้อยแล้วครับ ในรูปแบบ {output_format}",
                "exported": result
            }

        else:
            return {
                "reply": "ขออภัยครับ ผมยังไม่เข้าใจคำสั่งนี้แน่ชัด รบกวนพิมพ์ใหม่อีกครั้งนะครับ"
            }
