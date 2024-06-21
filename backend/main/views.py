from django.shortcuts import render
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from .models import *
from .database import *
from .utils import *


# Create your views here.


class RegisterView(viewsets.ViewSet):
    user_details = {}
    # otp = OTP()


    @method_decorator(csrf_exempt)
    @action(detail=False, methods=["post"])
    def registerpage1(self, request):
        try:
            firstname = request.data.get("firstname") 
            lastname = request.data.get("lastname")
            dob = request.data.get("dob")
            gender = request.data.get("gender")
            email = request.data.get("email")

            self.user_details["firstname"] = firstname
            self.user_details["lastname"] = lastname
            self.user_details["dob"] = dob
            self.user_details["gender"] = gender
            self.user_details["email"] = email

            return Response(
                {
                    "success" : True,
                    "message" : "",
                    "data" : None,
                    "error" : None
                }
            )
        except Exception as e:
            return Response(
                {
                    "success" : False, 
                    "message" : f'Unable to Register. Error: {e}',
                    "data" : None,
                    "error" : f"{e}"
                }, 
                status = 400
            )


    @method_decorator(csrf_exempt)
    @action(detail=False, methods=["post"])
    def registerpage2(self, request):
        try:
            address1 = request.data.get("address1")
            address2 = request.data.get("address2")
            state = request.data.get("state")
            city = request.data.get("city")
            pincode = request.data.get("pincode")
            country = request.data.get("country")

            self.user_details['address1'] = address1
            self.user_details['address2'] = address2
            self.user_details['state'] = state
            self.user_details['city'] = city
            self.user_details['pincode'] = pincode
            self.user_details['country'] = country

            return Response(
                {
                    "success" : True,
                    "message" : "",
                    "data" : None,
                    "error" : None
                }
            )
        except Exception as e:
            return Response(
                {
                    "success" : False, 
                    "message": f'Unable to Register. Error: {e}',
                    "data" : None,
                    "error" : f"{e}"
                }, 
                status = 400
            )


    @method_decorator(csrf_exempt)
    @action(detail=False, methods=["post"])
    def registergetotp(self, request):
        try:
            mobile1 = request.data.get("mobile1")
            mobile2 = request.data.get("mobile2")
            mobile = mobile1 + mobile2

            return Response(
                {
                    "success" : True,
                    "message" : "",
                    "data" : None,
                    "error" : None
                }
            )
        except Exception as e:
            return Response(
                {
                    "success" : False, 
                    "message": f'Unable to Send OTP to {mobile}. Error: {e}',
                    "data" : None,
                    "error" : f"{e}"
                }, 
                status = 400
            )


    @method_decorator(csrf_exempt)
    @action(detail=False, methods=["post"])
    def registerpage3(self, request):
        user = True  # Placeholder for actual user registration logic

        if user:
            return Response(
                {
                    "success" : True,
                    "message" : "",
                    "data" : None,
                    "error" : None
                }
            )
        else:
            return Response(
                {
                    "success" : False, 
                    "message" : 'Unable to Register',
                    "data" : None,
                    "error" : None
                }, 
                status = 400
            )


    @method_decorator(csrf_exempt)
    @action(detail=False, methods=["post"])
    def registerpage4(self, request):
        user = True  # Placeholder for actual user registration logic

        if user:
            return Response(
                {
                    "success" : True,
                    "message" : "",
                    "data" : None,
                    "error" : None
                }
            )
        else:
            return Response(
                {
                    "success" : False, 
                    "message" : 'Unable to Register',
                    "data" : None,
                    "error" : None
                }, 
                status = 400
            )


# Login
class LoginView(viewsets.ViewSet):
    @method_decorator(csrf_exempt)
    @action(detail=False, methods=["post"])
    def login(self, request):
        login_details = {}
        
        try:
            crypto = CryptoUtils()
            raw = request.data.get("data")
            success, login_details = crypto.decrypt(raw)
        except:
            return Response(
                {
                    "success" : False, 
                    "message" : '',
                    "data" : None,
                    "error" : "Unable to decrypt."
                }, 
                status = 500
            )
        
        if success:
            try:
                db = Database()
                response = db.LoginUser(login_details)
                db.CloseConnection()
                
                if response["success"]:
                    return Response(
                        {
                            "success" : True,
                            "message" : "User logged in successfully.",
                            "data" : None,
                            "error" : None
                        }
                    )
                else:
                    return Response(
                        {
                            "success" : False, 
                            "message" : 'Invalid username or password',
                            "data" : None,
                            "error" : None
                        }, 
                        status = 400
                    )
            except Exception as e:
                return Response( 
                    {
                        "success" : False,
                        "message" : "Nothing...",
                        "data" : None,
                        "error" : f"Something went wrong. Error: {e}" 
                    },
                    status = 400
                )


# Profile
class ProfileView(viewsets.ViewSet):
    authorized = False
   
    
    @method_decorator(csrf_exempt)
    @action(detail=False, methods=["post"])
    def isauthorized(self, request):
        user = True  # Simulated authentication for testing
        
        if user is not None:
            self.authorized = True
            
            return Response(
                {
                    "success" : True,
                    "message" : "",
                    "data" : None,
                    "error" : None
                }
            )
        else:
            return Response(
                {
                    "success" : False,
                    "message" : "",
                    "data" : None,
                    "error" : None
                },
                status = 401
            )
    
    
    @method_decorator(csrf_exempt)
    @action(detail=False, methods=['get'])
    def getuserdata(self, request):
        user = True  # Simulated authentication for testing
        
        if user is not None:
            return Response(
                {
                    "success" : True,
                    "message" : "",
                    "data" : None,
                    "error" : None
                }
            )
        else:
            return Response(
                {
                    "success" : False,
                    "message" : "",
                    "data" : None,
                    "error" : None
                },
                status = 401
            )


# Dashboard
class DashboardView(viewsets.ViewSet):
    authorized = False
    
    
    @method_decorator(csrf_exempt)
    @action(detail=False, methods=["post"])
    def isauthorized(self, request):
        user = True       
        
        if user is not None:
            self.authorized = True
            username = "Vignesh Goswami"
            profileimage = "user_123/profile/profile_0001.jpg"
            profileimage_url = request.build_absolute_uri(f"{settings.MEDIA_URL}{profileimage}")
            crypto = CryptoUtils()
            raw = {
                'username' : username,
                'profileimage' : profileimage_url
            }
            valid, enc = crypto.encrypt(raw)
            temp = MESSAGE_SERVICE()
            temp.send_via_email('vignesh20152@iiitd.ac.in', 'Hey', 'Hello!')
            temp.send_via_phone('+918178699520', "Hello!")
            temp.send_via_whatsapp('+918178699520', "Hello!") 
            
            if valid:
                return Response(
                    {
                        "success" : True,
                        "message" : "User is authorized.",
                        'data' : enc,
                        "error" : None
                    }
                )
            else:
                return Response(
                    {
                        "success" : False,
                        "message" : 'Unauthorized user. Try logging in again.',
                        "data" : None,
                        "error" : None
                    }, 
                    status = 500
                )
        else:
            return Response(
                {
                    "success" : False,
                    "message" : 'Unauthorized user. Try logging in again.',
                    "data" : None,
                    "error" : None
                }, 
                status = 401
            )
    
    
    @method_decorator(csrf_exempt)
    @action(detail=False, methods=["post"])
    def getuserdata(self, request):
        user = True  # Simulated authentication for testing
        
        if user is not None:
            return Response(
                {
                    "success" : True,
                    "message" : "",
                    "data" : None,
                    "error" : None
                }
            )
        else:
            return Response(
                {
                    "success" : False,
                    "message" : "",
                    "data" : None,
                    "error" : None
                },
                status = 404
            )


# Projects
class ProjectsView(viewsets.ViewSet):
    authorized = False
    
    
    @method_decorator(csrf_exempt)
    @action(detail=False, methods=["post"])
    def isauthorized(self, request):
        user = True  # Simulated authentication for testing
        username = "Vignesh Goswami"
        profileimage = "user_123/profile/profile_0002.jpg"
        profileimage_url = request.build_absolute_uri(f"{settings.MEDIA_URL}{profileimage}")
        
        if user is not None:
            self.authorized = True
            
            return Response(
                {
                    "success" : True,
                    "message" : "User is authorized.",
                    'data' : {
                        'username' : username,
                        'profileimage' : profileimage_url
                    },
                    "error" : None
                }
            )
        else:
            return Response(
                {
                    "success" : False,
                    "message" : 'Unauthorized user. Try logging in again.',
                    "data" : None,
                    "error" : None
                }, 
                status = 401
            )
    
    
    @method_decorator(csrf_exempt)
    @action(detail=False, methods=["get"])
    def getprojects(self, request):
        user = True  # Simulated authentication for testing
        
        if user is not None:
            return Response(
                {
                    "success" : True,
                    "message" : "",
                    "data" : None,
                    "error" : None
                }
            )
        else:
            return Response(
                {
                    "success" : False,
                    "message" : "",
                    "data" : None,
                    "error" : None
                },
                status = 404
            )



# Assignments
class AssignmentsView(viewsets.ViewSet):
    authorized = False
    
    
    @method_decorator(csrf_exempt)
    @action(detail=False, methods=["post"])
    def isauthorized(self, request):
        user = True  # Simulated authentication for testing
        username = "Vignesh Goswami"
        profileimage = "user_123/profile/profile_0002.jpg"
        profileimage_url = request.build_absolute_uri(f"{settings.MEDIA_URL}{profileimage}")
        
        if user is not None:
            self.authorized = True
            
            return Response(
                {
                    "success" : True,
                    "message" : "User is authorized.",
                    'data' : {
                        'username' : username,
                        'profileimage' : profileimage_url
                    },
                    "error" : None
                }
            )
        else:
            return Response(
                {
                    "success" : False,
                    "message" : 'Unauthorized user. Try logging in again.',
                    "data" : None,
                    "error" : None
                }, 
                status = 401
            )


# ManageProjects
class ManageProjectsView(viewsets.ViewSet):
    authorized = False
    
    
    @method_decorator(csrf_exempt)
    @action(detail=False, methods=["post"])
    def isauthorized(self, request):
        user = True  # Simulated authentication for testing
        username = "Vignesh Goswami"
        profileimage = "user_123/profile/profile_0002.jpg"
        profileimage_url = request.build_absolute_uri(f"{settings.MEDIA_URL}{profileimage}")
        
        if user is not None:
            self.authorized = True
            
            return Response(
                {
                    "success" : True,
                    "message" : "User is authorized.",
                    'data' : {
                        'username' : username,
                        'profileimage' : profileimage_url
                    },
                    "error" : None
                }
            )
        else:
            return Response(
                {
                    "success" : False,
                    "message" : 'Unauthorized user. Try logging in again.',
                    "data" : None,
                    "error" : None
                }, 
                status = 401
            )


# Project
class ProjectView(viewsets.ViewSet):
    authorized = False
    
    
    @method_decorator(csrf_exempt)
    @action(detail=False, methods=["post"])
    def isauthorized(self, request):
        user = True  # Simulated authentication for testing
        username = "Vignesh Goswami"
        profileimage = "user_123/profile/profile_0002.jpg"
        profileimage_url = request.build_absolute_uri(f"{settings.MEDIA_URL}{profileimage}")
        
        if user is not None:
            return Response(
                {
                    "success" : True,
                    "message" : "User is authorized.",
                    'data' : {
                        'username' : username,
                        'profileimage' : profileimage_url
                    },
                    "error" : None
                }
            )
        else:
            return Response(
                {
                    "success" : False,
                    "message" : 'Unauthorized user. Try logging in again.',
                    "data" : None,
                    "error" : None
                }, 
                status = 401
            )