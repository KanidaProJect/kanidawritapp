# core/interface_v1.py

class PluginInterface:
    """
    PluginInterface สำหรับโมดูลทั้งหมดในระบบ
    """
    def metadata(self):
        """
        ส่งคืนข้อมูลเมตาของปลั๊กอิน
        """
        raise NotImplementedError

    def validate_input(self, input_data):
        """
        ตรวจสอบว่าข้อมูลที่รับเข้ามาถูกต้องหรือไม่
        """
        raise NotImplementedError

    def run(self, *args, **kwargs):
        """
        รันการทำงานหลักของปลั๊กอิน
        """
        raise NotImplementedError
