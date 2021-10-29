from rest_framework.response import Response
from rest_framework.views import APIView

class APIStructureView(APIView):
    def get(self, request):
        return Response({
            "account/": "account API structure",
            "admin/": "admin page",
            "courseAPI/": "course API structure"
        })