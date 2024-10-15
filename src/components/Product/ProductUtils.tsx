type ItemProps = {
    id: string;
    name: string;
    description: string;
    collection: string;
    subcategory: string;
    price: number;
    currency: string;
    sizes: string[];
    brand: string;
    material: string;
    availability: boolean;
    stock_quantity: number;
    images: string[];
    rating: number;
    quantity?: number;
  };
  
  type ProductsInShoppingCart = {
    id: string;
    quantity: number;
    selectedSize: string;
  };
  
  // add product to shopping cart list, default quantity 1, selectedSize default value "Choose Size"
  export function addProductToCshoppingCart(
    product: ItemProps,
    productsInShoppingCart: ProductsInShoppingCart[],
    setProductsInShoppingCart: string,
    selectedSize: string = "Choose Size",
    quantity: number = 1
  ) {
    const item = {
      id: product.id,
      quantity: quantity,
      selectedSize: selectedSize,
    };
  
    // check or item already exist in shopping cart
    if (
      !productsInShoppingCart.some(
        (item: ProductsInShoppingCart) => item.id === product.id
      )
    ) {
      updateShoppingCartListInLocalStorage(
        item,
        productsInShoppingCart,
        setProductsInShoppingCart
      );
      console.log(productsInShoppingCart)
      const newArr = productsInShoppingCart;
      newArr.push(item);
      localStorage.setItem("shopping-cart", JSON.stringify(newArr));
    }
  }
  
  //update shopping cart list in local storage
  function updateShoppingCartListInLocalStorage(
    item: {
      id: string;
      quantity: number;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    productsInShoppingCart: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setProductsInShoppingCart: any
  ) {
    setProductsInShoppingCart([...productsInShoppingCart, item]);
  }
  