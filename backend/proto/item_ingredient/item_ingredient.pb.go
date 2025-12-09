package item_ingredient

import (
	context "context"

	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

const _ = grpc.SupportPackageIsVersion7

type ItemIngredientServiceClient interface {
	AddItemIngredient(ctx context.Context, in *AddItemIngredientRequest, opts ...grpc.CallOption) (*AddItemIngredientResponse, error)
	DeleteItemIngredient(ctx context.Context, in *DeleteItemIngredientRequest, opts ...grpc.CallOption) (*DeleteItemIngredientResponse, error)
	GetItemIngredients(ctx context.Context, in *GetItemIngredientsRequest, opts ...grpc.CallOption) (*GetItemIngredientsResponse, error)
}

type itemIngredientServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewItemIngredientServiceClient(cc grpc.ClientConnInterface) ItemIngredientServiceClient {
	return &itemIngredientServiceClient{cc}
}

func (c *itemIngredientServiceClient) AddItemIngredient(ctx context.Context, in *AddItemIngredientRequest, opts ...grpc.CallOption) (*AddItemIngredientResponse, error) {
	out := new(AddItemIngredientResponse)
	err := c.cc.Invoke(ctx, "/item_ingredient.ItemIngredientService/AddItemIngredient", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *itemIngredientServiceClient) DeleteItemIngredient(ctx context.Context, in *DeleteItemIngredientRequest, opts ...grpc.CallOption) (*DeleteItemIngredientResponse, error) {
	out := new(DeleteItemIngredientResponse)
	err := c.cc.Invoke(ctx, "/item_ingredient.ItemIngredientService/DeleteItemIngredient", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *itemIngredientServiceClient) GetItemIngredients(ctx context.Context, in *GetItemIngredientsRequest, opts ...grpc.CallOption) (*GetItemIngredientsResponse, error) {
	out := new(GetItemIngredientsResponse)
	err := c.cc.Invoke(ctx, "/item_ingredient.ItemIngredientService/GetItemIngredients", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

type ItemIngredientServiceServer interface {
	AddItemIngredient(context.Context, *AddItemIngredientRequest) (*AddItemIngredientResponse, error)
	DeleteItemIngredient(context.Context, *DeleteItemIngredientRequest) (*DeleteItemIngredientResponse, error)
	GetItemIngredients(context.Context, *GetItemIngredientsRequest) (*GetItemIngredientsResponse, error)
	mustEmbedUnimplementedItemIngredientServiceServer()
}

type UnimplementedItemIngredientServiceServer struct {
}

func (UnimplementedItemIngredientServiceServer) AddItemIngredient(context.Context, *AddItemIngredientRequest) (*AddItemIngredientResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method AddItemIngredient not implemented")
}
func (UnimplementedItemIngredientServiceServer) DeleteItemIngredient(context.Context, *DeleteItemIngredientRequest) (*DeleteItemIngredientResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method DeleteItemIngredient not implemented")
}
func (UnimplementedItemIngredientServiceServer) GetItemIngredients(context.Context, *GetItemIngredientsRequest) (*GetItemIngredientsResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetItemIngredients not implemented")
}
func (UnimplementedItemIngredientServiceServer) mustEmbedUnimplementedItemIngredientServiceServer() {}

func RegisterItemIngredientServiceServer(s grpc.ServiceRegistrar, srv ItemIngredientServiceServer) {
	s.RegisterService(&ItemIngredientService_ServiceDesc, srv)
}

var ItemIngredientService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "item_ingredient.ItemIngredientService",
	HandlerType: (*ItemIngredientServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "AddItemIngredient",
			Handler:    grpc.UnaryHandler(func(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
				in := new(AddItemIngredientRequest)
				if err := dec(in); err != nil {
					return nil, err
				}
				if interceptor == nil {
					return srv.(ItemIngredientServiceServer).AddItemIngredient(ctx, in)
				}
				info := &grpc.UnaryServerInfo{
					Server:     srv,
					FullMethod: "/item_ingredient.ItemIngredientService/AddItemIngredient",
				}
				handler := func(ctx context.Context, req interface{}) (interface{}, error) {
					return srv.(ItemIngredientServiceServer).AddItemIngredient(ctx, req.(*AddItemIngredientRequest))
				}
				return interceptor(ctx, in, info, handler)
			}),
		},
		{
			MethodName: "DeleteItemIngredient",
			Handler:    grpc.UnaryHandler(func(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
				in := new(DeleteItemIngredientRequest)
				if err := dec(in); err != nil {
					return nil, err
				}
				if interceptor == nil {
					return srv.(ItemIngredientServiceServer).DeleteItemIngredient(ctx, in)
				}
				info := &grpc.UnaryServerInfo{
					Server:     srv,
					FullMethod: "/item_ingredient.ItemIngredientService/DeleteItemIngredient",
				}
				handler := func(ctx context.Context, req interface{}) (interface{}, error) {
					return srv.(ItemIngredientServiceServer).DeleteItemIngredient(ctx, req.(*DeleteItemIngredientRequest))
				}
				return interceptor(ctx, in, info, handler)
			}),
		},
		{
			MethodName: "GetItemIngredients",
			Handler:    grpc.UnaryHandler(func(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
				in := new(GetItemIngredientsRequest)
				if err := dec(in); err != nil {
					return nil, err
				}
				if interceptor == nil {
					return srv.(ItemIngredientServiceServer).GetItemIngredients(ctx, in)
				}
				info := &grpc.UnaryServerInfo{
					Server:     srv,
					FullMethod: "/item_ingredient.ItemIngredientService/GetItemIngredients",
				}
				handler := func(ctx context.Context, req interface{}) (interface{}, error) {
					return srv.(ItemIngredientServiceServer).GetItemIngredients(ctx, req.(*GetItemIngredientsRequest))
				}
				return interceptor(ctx, in, info, handler)
			}),
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "item_ingredient.proto",
}
