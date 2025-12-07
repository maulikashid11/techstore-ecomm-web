"use client"
import React, { useState } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { addAllProducts } from '@/store/slices/productSlice'


const CreateProduct = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formElement = e.currentTarget;
    const formData = new FormData();
    formData.append('name', (formElement.elements.namedItem("name")).value);
    formData.append('price', (formElement.elements.namedItem("price")).value);
    formData.append('stock', (formElement.elements.namedItem("stock")).value);
    formData.append('category', (formElement.elements.namedItem("category")).value);
    formData.append('image', (formElement.elements.namedItem("image")).files[0]);
    formData.append('status', (formElement.elements.namedItem("status")).value);

    const res = await fetch('/api/product/create', {
      method: "POST",
      body: formData
    })

    const data = await res.json();
    if (data.success) {
      toast.success(data.message)
      const res = await fetch('/api/product/getall', {
        method: "GET",
      })
      const data = await res.json();
      if (data.success) {
        dispatch(addAllProducts(data.products.map(({ _id, name, category, price, image, stock }) => (
          { id: _id, name, category, price, image, stock }
        ))))
      }
      formElement.reset();  
    }
  }

  return (
    <div className='p-8'>
      <h2 className="text-3xl text-gray-900 mb-8 tracking-tight">
        Create Product
      </h2>

      <div className="max-w-2xl bg-white rounded-2xl p-8 border border-gray-200">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              required
              name='name'
              className="rounded-xl border-gray-200 mt-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                name="price"
                required
                className="rounded-xl border-gray-200 mt-2"
              />
            </div>
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                name="stock"
                required
                className="rounded-xl border-gray-200 mt-2"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              name='category'
              required
            >
              <SelectTrigger className="rounded-xl border-gray-200 mt-2">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent >
                <SelectItem value="Audio">Audio</SelectItem>
                <SelectItem value="Wearables">Wearables</SelectItem>
                <SelectItem value="Computers">Computers</SelectItem>
                <SelectItem value="Mobile">Mobile</SelectItem>
                <SelectItem value="Photography">Photography</SelectItem>
                <SelectItem value="Accessories">Accessories</SelectItem>
                <SelectItem value="Smart Home">Smart Home</SelectItem>
                <SelectItem value="Gaming">Gaming</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              type="file"
              name='image'
              required
              className="rounded-xl border-gray-200 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              name='status'
              required

            >
              <SelectTrigger className="rounded-xl border-gray-200 mt-2">
                <SelectValue placeholder="select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setActiveTab('products')}
              className="flex-1 rounded-xl border-gray-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gray-900 hover:bg-gray-800 rounded-xl"
            >
              Create Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProduct