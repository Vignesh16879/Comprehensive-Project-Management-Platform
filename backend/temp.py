import base64
import hashlib

from Cryptodome.Cipher import AES  # from pycryptodomex v-3.10.4
from Cryptodome.Random import get_random_bytes

HASH_NAME = "SHA256"
IV_LENGTH = 16
ITERATION_COUNT = 65536
KEY_LENGTH = 32


def pad(s): return s + (IV_LENGTH - len(s) % IV_LENGTH) * chr(IV_LENGTH - len(s) % IV_LENGTH)


def unpad(s): return s[0:-ord(s[-1:])]


def get_secret_key(password, salt):
    return hashlib.pbkdf2_hmac(HASH_NAME, password.encode(), salt.encode(), ITERATION_COUNT, KEY_LENGTH)


def encrypt(password, salt, message):
    secret = get_secret_key(password, salt)
    message = pad(message)
    iv = get_random_bytes(IV_LENGTH)
    cipher = AES.new(secret, AES.MODE_CBC, iv)
    cipher_bytes = base64.b64encode(iv + cipher.encrypt(message.encode("utf8")))
    return bytes.decode(cipher_bytes)


def decrypt(password, salt, cipher_text):
    secret = get_secret_key(password, salt)
    decoded = base64.b64decode(cipher_text)
    iv = decoded[:AES.block_size]
    cipher = AES.new(secret, AES.MODE_CBC, iv)
    original_bytes = unpad(cipher.decrypt(decoded[IV_LENGTH:]))
    return bytes.decode(original_bytes)


f_salt = "anySaltYouCanUseOfOn"
secret_key = "yourSecretKey"
plain_text = "M0993000353"

cipherText = encrypt(secret_key, f_salt, plain_text)
print("CipherText: " + cipherText)

decryptedMessage = decrypt(secret_key, f_salt, cipherText)
print("DecryptedMessage: " + decryptedMessage)
