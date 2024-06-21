import os
import json
import string
import random
import base64
import smtplib
import markdown
from dotenv import load_dotenv
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
from rest_framework.renderers import BaseRenderer
from datetime import datetime, timedelta
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from twilio.rest import Client


load_dotenv()

class CryptoUtils:
    def __init__(self):
        AES_SECRET_KEY = bytes(os.getenv('AES_SECRET_KEY'), 'utf-8')
        AES_IV = bytes(os.getenv('AES_IV'), 'utf-8')
        
        if AES_SECRET_KEY and AES_IV:
            self.bs = AES.block_size
            self.key = AES_SECRET_KEY
            self.iv = AES_IV
        else:
            return False, "Unable to get the key from enviroment."


    def encrypt(self, raw):
        try:
            data = json.dumps(raw).encode('utf-8')
            raw = pad(data, self.bs)
            cipher = AES.new(self.key, AES.MODE_CBC, self.iv)
            encrypted = cipher.encrypt(raw)
            
            return True, base64.b64encode(encrypted).decode('utf-8')
        except Exception as e:
            return False, e

    def decrypt(self, enc):
        try:
            enc = base64.b64decode(enc)
            cipher = AES.new(self.key, AES.MODE_CBC, self.iv)
            decrypted = cipher.decrypt(enc)
            unpadded = self._unpad(decrypted)
            data = json.loads(unpadded.decode('utf-8'))
            
            return True, data
        except Exception as e:
            return False, e


    def _pad(self, s):
        return s + (self.bs - len(s) % self.bs) * chr(self.bs - len(s) % self.bs)


    @staticmethod
    def _unpad(s):
        return s[:-ord(s[len(s)-1:])]


# OTP
class OTP_SERVICE:
    valid_till = datetime.now()
    otp = ""
    
    
    # Generates OTP
    def generate_otp(self, length = 6):
        characters = string.digits
        self.otp = ''.join(random.choice(characters) for _ in range(length))
        self.valid_till = datetime.now() + timedelta(minutes = 5)
        
        return self.valid_till, self.otp
    
    
    # Verify OTP
    def verify_otp(self, otp):
        if otp == self.otp:
            if datetime.now() <= self.valid_till:
                return True, "Valid OTP"
            else:
                return False, "OTP timeout."
        else:
            return False, "Invalid OTP."


# Send messages
class MESSAGE_SERVICE:
    FROM = "vigneshgoswami168@gmail.com"
    PASSWORD = "#sddasf@234klwsa#"
    app_password = "kcig pkzy lcfp dagg"
    account_sid = 'ACa69e7d959af6a3da4caff867399585a0'
    auth_token = '21d99c25f2d3b45d08c9d3b056928cd1'
    from_phone = '+14042366801'
    
    
    def send_via_email(self, email, subject, message, attachments = []):
        HTML = '''
            <html>
                <head>
                </head>
                <body>
                    <h1>Your OTP: </h1>
                </body>
            </html>
        '''.format()
        
        TO = [email]
        FROM = self.FROM
        SUBJECT = subject
        BODY = f'Your OTP is: '
        CONTENT = message
        
        MESSAGE = MIMEMultipart('related')
        MESSAGE['to'] = ', '.join(TO)
        MESSAGE['from'] = FROM
        MESSAGE['subject'] = SUBJECT
        MESSAGE.attach(MIMEText(HTML, 'html'))
        
        session = smtplib.SMTP('smtp.gmail.com', 587)
        session.starttls()
        session.login(self.FROM, self.app_password)

        TEXT = MESSAGE.as_bytes()
        
        if len(attachments) > 1:
            multipart_msg = MIMEMultipart("alternative")
            multipart_msg["From"] = FROM
            multipart_msg["To"] = TO
            multipart_msg["Subject"] = SUBJECT
            
            text = message
            html = markdown.markdown(text)

            part1 = MIMEText(text, "plain")
            part2 = MIMEText(html, "html")

            multipart_msg.attach(part1)
            multipart_msg.attach(part2)

            for content, name in zip(attachments['contents'], attachments['names']):
                attach_part = MIMEBase('application', 'octet-stream')
                attach_part.set_payload(content)
                encoders.encode_base64(attach_part)
                attach_part.add_header('Content-Disposition', f"attachment; filename={name}")
                multipart_msg.attach(attach_part)
            
            try:
                session.sendmail(FROM, TO, multipart_msg.as_string())
            except Exception as err:
                print(f'Problem occurred while sending to {TO} ')
                print(err)
        elif len(attachments) == 1:
            pass
        else:
            session.sendmail(FROM, (TO), TEXT)
        
        session.quit()
    
    
    def send_via_phone(self, to, body):
        pauth_token = '[AuthToken]'
        client = Client(self.account_sid, self.auth_token)

        message = client.messages.create(
            from_='14042366801',
            body=body,
            to=to
        )
        
    
    def send_via_whatsapp(self, to, body):
        client = Client(self.account_sid, self.auth_token)

        message = client.messages.create(
            from_=f'whatsapp:+14155238886',
            body=body,
            to=f'whatsapp:{to}'
        )