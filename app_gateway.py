from flask import Flask, request, jsonify, send_file
import sys
import os

# ✅ เพิ่ม path ของโฟลเดอร์ modules
sys.path.append(os.path.join(os.path.dirname(__file__), 'modules'))

from modules.module_useragent.plugin import Plugin as UserAgent

app = Flask(__name__)

@app.route('/api/process', methods=['POST'])
def process_request():
    try:
        input_data = request.json
        user_agent = UserAgent()
        result = user_agent.run(input_data=input_data)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ✅ เพิ่ม route / และ favicon.ico ตามที่ตกลงกัน
@app.route('/')
def index():
    return send_file('index.html')

@app.route('/favicon.ico')
def favicon():
    return send_file('favicon.ico')

# ✅ แก้เฉพาะส่วนนี้: bind host และ port สำหรับ Render
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 10000))
    app.run(host='0.0.0.0', port=port, debug=True)
