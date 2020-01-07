import * as actionTypes from './actionTypes'
import Product from '../../models/product'

export const fetchProducts = () => {
    return async dispatch => {
        try {
            const response = await fetch('https://reactnativeshopapp.firebaseio.com/products.json', {
                method: 'GET'
            })

            if(!response.ok) {
               throw new Error('Something went wrong!') 
            }
    
            const resData = await response.json()
            const loadedProducts = []
            
            for(const key in resData) {
                loadedProducts.push(new Product(
                    key, 'u1', 
                    resData[key].title, 
                    resData[key].imageUrl, 
                    resData[key].description, 
                    resData[key].price
                    ))
            }
    
            dispatch({type: actionTypes.SET_PRODUCTS, products: loadedProducts })
        } catch(err) {
            throw err
        }

    }
}

export const deleteProduct = productId => {
    return async dispatch => {
       const response = await fetch(`https://reactnativeshopapp.firebaseio.com/products/${productId}.json`, {
            method: 'DELETE'
        })

        if(!response.ok) {
            throw new Error('Something went wrong!')
        }

        dispatch({
            type: actionTypes.DELETE_PRODUCT,
            pid: productId
        })
    }

}

export const createProduct = (title, description, imageUrl, price) => {
    return async dispatch => {
        const response = await fetch('https://reactnativeshopapp.firebaseio.com/products.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price
            })
        })

        const resData = await response.json()

        console.log(resData)
        
        dispatch({
        type: actionTypes.CREATE_PRODUCT,
        productData: {
            id: resData.name,
            title,
            description,
            imageUrl,
            price
        }
    })
}
}

export const updateProduct = (id,title, description, imageUrl) => {
    return async dispatch => {
        const response = await fetch(`https://reactnativeshopapp.firebaseio.com/products/${id}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl
            })
        })
        if(!response.ok) {
            throw new Error('Something went wrong!')
        }

        dispatch ({
            type: actionTypes.UPDATE_PRODUCT,
            pid: id,
            productData: {
                title,
                description,
                imageUrl
            }
        })
    }

}
