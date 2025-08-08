# modules/module_exporter/plugin.py

from core.interface_v1 import PluginInterface

class Plugin(PluginInterface):
    def metadata(self):
        return {
            "name": "Exporter",
            "description": "ส่งออกพล็อตและทรีตเมนต์เป็นไฟล์รูปแบบต่างๆ",
            "version": "1.1"
        }

    def validate_input(self, input_data):
        return "title" in input_data and "scenes" in input_data

    def run(self, input_data):
        title = input_data["title"]
        scenes = input_data["scenes"]
        output_format = input_data.get("format", "txt") # กำหนด default เป็น 'txt'

        if output_format == "txt":
            exported_text = self._create_txt_content(title, scenes)
            return {"exported": exported_text, "format": "txt"}
        elif output_format == "html":
            exported_text = self._create_html_content(title, scenes)
            return {"exported": exported_text, "format": "html"}
        else:
            return {"error": "ไม่รองรับรูปแบบไฟล์ที่ระบุ", "format": output_format}

    def _create_txt_content(self, title, scenes):
        """สร้างเนื้อหาสำหรับไฟล์ .txt"""
        content = f"--- {title} ---\n\n"
        for scene in scenes:
            content += f"ตอนที่ {scene['scene_number']}: {scene['mood']}\n"
            content += f"  - สรุป: {scene['summary']}\n"
            content += f"  - บทสนทนา: {' '.join(scene.get('dialog', []))}\n\n"
        return content

    def _create_html_content(self, title, scenes):
        """สร้างเนื้อหาสำหรับไฟล์ .html"""
        html_content = f"""
        <!DOCTYPE html>
        <html lang="th">
        <head>
            <meta charset="UTF-8">
            <title>{title}</title>
            <style>
                body {{ font-family: sans-serif; line-height: 1.6; padding: 20px; }}
                .scene {{ margin-bottom: 20px; padding: 15px; border-left: 3px solid #333; }}
                h2 {{ color: #004d40; }}
            </style>
        </head>
        <body>
            <h1>{title}</h1>
            <hr>
        """
        for scene in scenes:
            html_content += f"""
            <div class="scene">
                <h2>ตอนที่ {scene['scene_number']} <small>({scene['mood']})</small></h2>
                <p><strong>สรุป:</strong> {scene['summary']}</p>
                <p><strong>บทสนทนา:</strong> {' '.join(scene.get('dialog', []))}</p>
            </div>
            """
        html_content += """
        </body>
        </html>
        """
        return html_content
