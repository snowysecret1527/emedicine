package com.emedicine.service;

import java.util.Date;
import java.util.List;

import com.emedicine.custom_exceptions.OrdersException;
import com.emedicine.dto.OrderDto;
import com.emedicine.pojos.Orders;

public interface OrdersService {
	//public OrderDto placeOrder(Integer orderId) throws OrdersException;

	public Orders updateOrders(Integer ordersid,OrderDto orderDTo)throws OrdersException;

	public Orders getOrdersDetails(Integer orderid)throws OrdersException;

	public List<OrderDto> getAllUserOrder(Integer userId)throws OrdersException;

	public List<Orders> viewAllOrders()throws OrdersException;

	public List<Orders> viewAllOrderByDate(Date date)throws OrdersException;
	 public OrderDto placeOrder(Integer userId) throws OrdersException;
	public void deleteOrders(Integer userId,Integer Orderid)throws OrdersException;
}
