import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/cart/cart';
import { RetornoTaxaEntrega } from '../models/cart/retornoTaxaEntrega';
import { NavController } from '@ionic/angular';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  public cart: Cart;
  public valorTotal: number;
  public retornoTaxaEntrega: RetornoTaxaEntrega;
  constructor(
    public navCtrl: NavController,
    public cartService:  CartService
  ) {
    this.cart = new Cart(null,null,null,null,null,null,null,null,null);
    this.retornoTaxaEntrega = new RetornoTaxaEntrega(null,null);
   }

  ngOnInit() {

    //this.pedido.usuario = new Usuario(sessionStorage.getItem('usuarioId'),"Bruno Hauck",sessionStorage.getItem('usuarioLogado'),null,null)
    if(sessionStorage.getItem('flagLogado')!="sim"){
      this.goToLogin();
    }else{          
      //Recupera o carrinho da sessão
      if(sessionStorage.getItem('cart')){
        this.cart = JSON.parse(sessionStorage.getItem('cart'))
      }
      else{      
        console.log("Carrinho vazio");
      } 
    }  
  }
  goToLogin(){
    this.navCtrl.navigateRoot('/login');
  }
  goToRestaurants(){
    this.navCtrl.navigateRoot('/home');
  }
  verificaTaxaEntrega(){
    //acessar o servidor
  }
    // Função para tratar incluir e excluir itens do carrinho
    private updateQuantity(index,amount){
      // se quantidade for maior que zero
      if (this.cart.ordermenus[index].quantity + amount > 0) {
        // se for retirar ou incluir item do carrinho tem que alterar o valor total
        if(amount==-1){
          this.cart.cart_total = this.cart.cart_total*1 - this.cart.ordermenus[index].menu.price*1;
        }else{
          this.cart.cart_total = this.cart.cart_total*1 + this.cart.ordermenus[index].menu.price*1;
        }
        // Aumenta ou diminui a quantidade
        this.cart.ordermenus[index].quantity = this.cart.ordermenus[index].quantity + amount;
        // Grava o carrinho na sessão novamente
        sessionStorage.setItem("cart", JSON.stringify(this.cart));       
      } 
      else if (this.cart.ordermenus[index].quantity + amount === 0) {
        // se a quantidade for igual a zero retira o item do carrinho    
        this.cart.cart_total = this.cart.cart_total*1 - this.cart.ordermenus[index].menu.price*1; 
        this.cart.ordermenus.splice(index, 1);
        // Grava o carrinho na sessão novamente
        sessionStorage.setItem("cart", JSON.stringify(this.cart));
      }else {
        return;
      }
    }    
    increaseQuantity(index) {
      // função para adicionar item no carrinho
      this.updateQuantity(index,1);
    }
    decreaseQuantity(index) {
      // função para remover o item do carrinho
      this.updateQuantity(index,-1);
    }
    checkout(){
      this.cart.status = "ordered";     
      this.cartService.addOrder(this.cart).subscribe((res)=>{
        console.log("Entrou no subscribe");
        console.log(res);
        console.log(this.cart)
        if(res==undefined){
          console.log("Falha no login")
        }else{
          console.log(res)
          //sessionStorage.setItem("token", JSON.stringify(this.token));
          //sessionStorage.setItem("flagLogado", "sim");
          this.navCtrl.navigateRoot('/paypal');
        }
        
      },
      (err) => {console.log(err)}
      );
    }
}
