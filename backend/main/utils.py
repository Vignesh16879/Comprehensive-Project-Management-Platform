from datetime import datetime, timedelta
import base64
import smtplib
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart


# OTP
class OTP_SERVICE:
    valid_till = datetime.now()
    otp = ""
    
    
    # Generates OTP
    def generate_otp(self, length = 6):
        characters = string.digits
        self.otp = ''.join(random.choice(characters) for _ in range(length))
        self.valid_till = datetime.now() + timedelta(minutes = 5)
        
        return valid_till, otp
    
    
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
    FROM = "dragoneyextest@gmail.com"
    PASSWORD = "#sddasf@234klwsa#"
    
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

        print('Starting session')
        session = smtplib.SMTP('smtp.gmail.com')
        session.starttls()

        print('Logging in')
        session.login('dragoneyextest@gmail.com', '#sddasf@234klwsa#')
        print('Logged in')

        TEXT = MESSAGE.as_bytes()

        print('Sending email')
        
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
                session.sendmail(SENDER_EMAIL, receiver, multipart_msg.as_string())
            except Exception as err:
                print(f'Problem occurred while sending to {receiver} ')
                print(err)
        elif len(attachments) == 1:
            pass
        else:
            session.sendmail(FROM, (TO), TEXT)
        
        session.quit()
        print("Emails sent successfully")
    
    
    def send_via_phone():
        pass