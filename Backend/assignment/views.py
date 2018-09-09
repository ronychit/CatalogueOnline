from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from assignment.models import Attributes,Product,Category,Products_Attributes
from assignment.serializers import AttributeSerializer,ProductSerializer,CategorySerializer,ProductAttributeSerializer,ProductDetailsSerializer
from django.http import JsonResponse



@api_view(['GET', 'POST'])
def attribute_list(request):
    """
    List all attributes, or create a new attribute.
    """
    if request.method == 'GET':
        attributes = Attributes.objects.all()
        serializer = AttributeSerializer(attributes, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        serializer = AttributeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET', 'PUT', 'DELETE'])
def attribute_detail(request, pk):
    """
    Retrieve, update or delete a attribute.
    """
    try:
        attribute = Attributes.objects.get(pk=pk)
    except Attributes.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = AttributeSerializer(attribute)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'PUT':
        serializer = AttributeSerializer(attribute, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        attribute.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def product_list(request):
    """
    List all Products, or create a new Product.
    """
    if request.method == 'GET':
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        product = Product()
        product.product_name = request.data['product_name']
        product.product_description = request.data['product_description']

        product.save()
        try:
            for cat_id in request.data['category']:
                product.category.add(Category.objects.get(pk=cat_id))
            for attribute in request.data['attributes']:
                dbAttribute = Attributes.objects.get(pk=attribute['id'])
                pa = Products_Attributes()
                pa.attribute_value = attribute['value'];
                pa.product = product
                pa.attribute = dbAttribute
                pa.save()
            return Response('OK', status=status.HTTP_201_CREATED)
        except Category.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def product_attributes(request, pk):
    product = Product.objects.get(pk=pk)
    attributes = Products_Attributes.objects.all().filter(product=product)
    serializer = ProductAttributeSerializer(attributes, many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['GET', 'PUT', 'DELETE'])
def product_detail(request, pk):
    """
    Retrieve, update or delete a Product.
    """
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProductDetailsSerializer(product)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'PUT':
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def category_list(request):
    """
    List all Categories, or create a new Categories.
    """
    if request.method == 'GET':
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def category_detail(request, pk):
    """
    Retrieve, update or delete a Product.
    """
    try:
        category = Category.objects.get(pk=pk)
    except Category.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CategorySerializer(category)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'PUT':
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def productattribute_list(request):
    """
    List all Categories, or create a new Categories.
    """
    if request.method == 'GET':
        productattributedetails=[]
        productattribute = Products_Attributes.objects.all()
        return JsonResponse(get_Product_Attribute_Details(productattribute), safe=False)

    elif request.method == 'POST':
        serializer = ProductAttributeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def product_attribute_detail(request, pk):
    """
    Retrieve, update or delete a Product and Attributes.
    """
    try:
        productattribute = Products_Attributes.objects.get(pk=pk)
    except Products_Attributes.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        return JsonResponse(get_Product_Attribute_List(productattribute), safe=False)

    elif request.method == 'PUT':
        serializer = ProductAttributeSerializer(productattribute, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        productattribute.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



def get_Product_Attribute_Details(productattribute):

    product_attribute_details_list = []
    for attribute_details in productattribute.iterator():
        details = attribute_details.attribute.products_attributes_set.all()
        for i in details.iterator():

            product_attribute_details_dic={"id" : i.id,
                                        "Product_id" : i.product_id,
                                     "Product_Name":i.product.product_name,
                                     "Attribute_id" : i.attribute_id,
                                   "Attribute_Name" :i.attribute.attribute_name,
                                   "Attribute_Value" : i.attribute_value}
        product_attribute_details_list.append(product_attribute_details_dic)


    return product_attribute_details_list


def get_Product_Attribute_List(productattribute):

    product_attribute_details_list = []
    details = productattribute.attribute.products_attributes_set.all()
    for i in details.iterator():

        product_attribute_details_dic={"id" : i.id,
                                        "Product_id" : i.product_id,
                                     "Product_Name":i.product.product_name,
                                     "Attribute_id" : i.attribute_id,
                                   "Attribute_Name" :i.attribute.attribute_name,
                                   "Attribute_Value" : i.attribute_value}
        product_attribute_details_list.append(product_attribute_details_dic)


    return product_attribute_details_list