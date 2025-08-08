# modules/module_treatmentgen/plugin.py

from core.interface_v1 import PluginInterface

class Plugin(PluginInterface):
    def metadata(self):
        return {
            "name": "TreatmentGen",
            "description": "สร้างทรีตเมนต์จากฉากและข้อมูลพล็อต",
            "version": "1.0"
        }

    def validate_input(self, input_data):
        return "title" in input_data and "scenes" in input_data

    def run(self, input_data):
        title = input_data["title"]
        scenes = input_data["scenes"]
        
        # สร้างพล็อตย่อ (จาก module_plotweaver)
        plot_summary = self.weave_plot(scenes)
        
        # สร้างทรีตเมนต์ฉบับสมบูรณ์ (จาก module_treatgen)
        treatment = self.generate_treatment(title, plot_summary)
        
        return {"treatment": treatment}

    def weave_plot(self, scenes):
        plot = ""
        for scene in scenes:
            plot += f"ตอนที่ {scene['scene_number']} ({scene['mood']}): {scene['summary']}\n"
            if "dialog" in scene:
                plot += f"  บทสนทนา: {' '.join(scene['dialog'])}\n"
        return plot

    def generate_treatment(self, title, plot_summary):
        return f"เรื่อง: {title}\n\nบทสรุป: เรื่องนี้เริ่มต้นเมื่อ...\n\nพล็อตเรื่อง:\n{plot_summary}"
