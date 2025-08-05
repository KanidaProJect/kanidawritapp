# app_gateway.py

from flask import Flask, request, jsonify
from modules.module_useragent.plugin import Plugin as UserAgent

app = Flask(__name__)

@app.route('/api/process', methods=['POST'])
def process_request():
    try:
        input_data = request.json
        # เรียกใช้ module_useragent เพื่อประมวลผลคำสั่ง
        user_agent = UserAgent()
        result = user_agent.run(input_data=input_data)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
