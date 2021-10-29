from rest_framework import serializers
from .models import *
from .models import Member

class MemberSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Member
        fields = ('id', 'code', 'email', 'name', 'password','image','gender','is_lecturer')
        read_only_fields = ('id','code','is_lecturer')
        extra_kwargs = {'password':{'write_only': True,'required': False}}

    def create(self, validated_data):
        
        user = Member(
            email=validated_data['email'],
            name=validated_data['name']
            )
        user.set_password(validated_data['password'])
        user.save()
        return user