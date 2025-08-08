# modules/module_refiner/plugin.py

from core.interface_v1 import PluginInterface

class Plugin(PluginInterface):
    def metadata(self):
        return {
            "name": "Refiner",
            "description": "วิเคราะห์อารมณ์ ปรับสำนวน และแก้ไขเนื้อหาของฉาก",
            "version": "1.0"
        }

    def validate_input(self, input_data):
        return "scenes" in input_data and "style_mode" in input_data

    def run(self, input_data):
        scenes = input_data["scenes"]
        style_mode = input_data["style_mode"]
        
        for scene in scenes:
            # 1. วิเคราะห์อารมณ์ (จาก module_moodtuner)
            scene["mood"] = self.analyze_mood(scene["summary"])
            
            # 2. ปรับสำนวน (จาก module_stylefixer)
            scene["summary"] = self.refine_text(scene["summary"], style_mode)

            # 3. แก้ไขข้อความ (จาก module_editor)
            scene["summary"] = self.edit_text(scene["summary"])

        return {"scenes": scenes}

    def analyze_mood(self, summary):
        if "ลุ้นระทึก" in summary:
            return "ตึงเครียด"
        elif "เปิดตัว" in summary:
            return "อบอุ่น"
        else:
            return "ปกติ"

    def refine_text(self, text, mode):
        if mode == "ละมุน":
            return text.replace("แต่", "ทว่า").replace("มาก", "เหลือเกิน")
        elif mode == "ร่วมสมัย":
            return text.replace("ค่ะ", "").replace("ครับ", "").replace("เธอ", "คุณ")
        elif mode == "กระชับ":
            return text.replace("ๆ", "").replace("มาก", "")
        return text

    def edit_text(self, text):
        # จำลองการจัดเรียงประโยคและลบคำซ้ำ
        return " ".join(sorted(list(set(text.split()))))
