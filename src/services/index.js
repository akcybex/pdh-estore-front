// Get Unique Brands from Json Data
export const getBrands = (products) => {
    var uniqueBrands = [];
    products.map((product, index) => {
        if (product.tags) {
            product.tags.map((tag) => {
                if (uniqueBrands.indexOf(tag) === -1) {
                    uniqueBrands.push(tag);
                }
            })
        }
    })
    //console.log(uniqueBrands)
    return uniqueBrands;
}

// Get Unique Colors from Json Data
export const getColors = (products) => {
    var uniqueColors = [];
    products.map((product, index) => {
        if (product.colors) {
            product.colors.map((color) => {
                if (uniqueColors.indexOf(color) === -1) {
                    uniqueColors.push(color);
                }
            })
        }
    })
    //console.log(uniqueBrands)
    return uniqueColors;
}

// Get Minimum and Maximum Prices from Json Data
export const getMinMaxPrice = (products) => {
    let min = 100, max = 1000;

    products.map((product, index) => {
        let v = product.price;
        min = (v < min) ? v : min;
        max = (v > max) ? v : max;
    })

    return { 'min': min, 'max': max };
}

export const getVisibleproducts = (data, { value, sortBy }, cateogry) => {
    console.log('VIS', cateogry, value)
    return data.products.filter(product => {
        // console.log('PR', product);


        // let brandMatch;
        // if (product.tags)
        //     brandMatch = product.tags.some(tag => brand.includes(tag))
        // else
        //     brandMatch = true;

        // let colorMatch;
        // if (color && product.colors) {
        //     colorMatch = product.colors.includes(color)
        // } else {
        //     colorMatch = true;
        // }

        const startPriceMatch = typeof value.min !== 'number' || value.min <= product.price;
        const endPriceMatch = typeof value.max !== 'number' || product.price <= value.max;

        // return brandMatch && colorMatch && startPriceMatch && endPriceMatch;
        return product.category_id == cateogry && startPriceMatch && endPriceMatch;
    }).sort((product1, product2) => {
        if (sortBy === 'HighToLow') {
            return product2.price < product1.price ? -1 : 1;
        } else if (sortBy === 'LowToHigh') {
            return product2.price > product1.price ? -1 : 1;
        } else if (sortBy === 'Newest') {
            return product2.id < product1.id ? -1 : 1;
        } else if (sortBy === 'AscOrder') {
            return product1.name.localeCompare(product2.name);
        } else if (sortBy === 'DescOrder') {
            return product2.name.localeCompare(product1.name);
        } else {
            return product2.id > product1.id ? -1 : 1;
        }
    });
}
function getUnique(arr, comp) {
    // store the comparison  values in array
    const unique = arr.map(e => e[comp])
        // store the indexes of the unique objects
        .map((e, i, final) => final.indexOf(e) === i && i)
        // eliminate the false indexes & return unique objects
        .filter((e) => arr[e]).map(e => arr[e]);

    return unique;
}
// Modify this function
export const getCartTotal = cartItems => {
    var user = JSON.parse(localStorage.getItem('logged'));
    var total = 0;
    // let unique = getUnique(cartItems, 'id');
    // console.log('U', unique)
    for (var i = 0; i < cartItems.length; i++) {
        // total += parseInt(cartItems[i].qty, 10) * parseInt((cartItems[i].price * cartItems[i].discount / 100), 10);
        if (user) {
            if (cartItems[i].user == user.id || cartItems[i].user == 'guest')
                total += parseInt(cartItems[i].qty, 10) * parseInt((cartItems[i].price), 10);
        } else {
            if (cartItems[i].user == 'guest')
                total += parseInt(cartItems[i].qty, 10) * parseInt((cartItems[i].price), 10);
        }
    }
    return total;
}

// My Custom get user items function
export const getUserItems = userItems => {
    // console.log('I**', userItems)
    var user = JSON.parse(localStorage.getItem('logged'));
    let items;
    if (user) {
        items = userItems.filter(item => {
            // if (item.user == 'guest') {
            //     item.user = user.id
            // }
            return item.user == user.id || item.user == 'guest';
        })
        // return getUnique(items, 'id')
    } else {
        items = userItems.filter(item => {
            return item.user == 'guest';
        })
    }
    return items;
}
// Get Trending Tag wise Collection
export const getTrendingTagCollection = (products, type, tag) => {
    const items = products.filter(product => {
        return product.category === type && product.tags.includes(tag);
    })
    return items.slice(0, 8)
}

// Get Trending Collection
export const getTrendingCollection = (products, type) => {
    // console.log('TRAND', products,'T', type)
    const items = products.filter(product => {
        // return product.category === type;
        // console.log('*', product)
        return product;
    })
    // console.log('***', items)
    return items.slice(0, 8)
}

// Get Special 5 Collection
export const getSpecialCollection = (products, type) => {
    const items = products.filter(product => {
        return product.category === type;
    })
    return items.slice(0, 5)
}

// Get TOP Collection
export const getTopCollection = products => {
    const items = products.filter(product => {
        return product.rating > 4;
    })
    return items.slice(0, 8)
}

// Get New Products
export const getNewProducts = (products, type) => {
    const items = products.filter(product => {
        return product.new === true && product.category === type;
    })

    return items.slice(0, 8)
}

// Get Related Items
export const getRelatedItems = (products, type) => {
    const items = products.filter(product => {
        return product.category === type;
    })

    return items.slice(0, 4)

}

// Get Best Seller Furniture
export const getBestSellerProducts = (products, type) => {
    const items = products.filter(product => {
        return product.sale === true && product.category === type;
    })

    return items.slice(0, 8)
}

// Get Best Seller
export const getBestSeller = products => {
    const items = products.filter(product => {
        return product.sale === true;
    })

    return items.slice(0, 8)
}

// Get Mens Wear
export const getMensWear = products => {
    const items = products.filter(product => {
        return product.category === 'men';
    })

    return items.slice(0, 8)
}

// Get Womens Wear
export const getWomensWear = products => {
    const items = products.filter(product => {
        return product.category === 'women';
    })

    return items.slice(0, 8)
}

// Get Single Product
export const getSingleItem = (products, id) => {

    const items = products.find((element) => {
        return element.id === id;
    })
    return items;
}

// Get Feature Products
export const getFeatureImages = (products, type) => {

    const items = products.filter(product => {
        return product.type === type;
    })
    return items;
}


