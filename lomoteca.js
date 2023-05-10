document.addEventListener('DOMContentLoaded', ()=>{
//Data form
let DatosPedidos = []

const lomos = [
	{ tipo: 'COMPLETO', precio: 1200, ingredientes: 'carne, lechuga, tomate, queso, jamon y huevo', imagen: 'https://www.clarin.com/img/2021/07/26/el-lomito-uno-de-los___u-aUfp64d_1256x620__1.jpg' },
	{ tipo: 'ESPECIAL', precio: 1000, ingredientes: 'carne, lechuga, tomate, queso y jamon', imagen: 'https://saboresmendoza.com/wp-content/uploads/2019/09/lomos-1.jpg' },
	{ tipo: 'PROVOLONE', precio: 1500, ingredientes: 'carne, lechuga, tomate, provolone, jamon y huevo', imagen: 'https://www.lavoz.com.ar/resizer/MVFdrLl-6gcR8xm9gSp2HDNKczk=/1023x683/smart/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/5QDDPCU7ZBFNZAJG3554AWGTIE.jpg' },
	{ tipo: 'VEGETARIANO', precio: 800, ingredientes: 'lechuga, tomate, queso, huevo y cebolla', imagen: 'https://betos.com.ar/wp-content/uploads/2019/08/Vegetal.png' }
];

const bebidas = [
	{ marca: 'coca cola', precio: 150 },
	{ marca: 'sprite', precio: 150 },
	{ marca: 'fanta', precio: 150 },
	{ marca: 'no', precio: 0 },
];
const papas = [
	{ tipo: 'comun', precio: 100},
	{ tipo: 'chedar', precio: 150},
	{ tipo: 'provenzal', precio: 200},
	{ tipo: 'no', precio: 0},
];
//Lomiteria

class Lomo {
	constructor(tipo, precio, ingredientes, imagen) {
		(this.tipo = tipo),
		(this.precio = precio),
		(this.ingredientes = ingredientes),
		(this.imagen = imagen)
	}

	getTipoLomo() {
		return this.tipo;
	}
	getPrecio() {
		return this.precio;
	}

}

class Bebida {
	constructor(marca, precio) {
		(this.marca = marca), (this.precio = precio);
	}
	getMarca() {
		return this.marca;
	}
	getPrecio() {
		return this.precio;
	}
}

class Papa {
	constructor(tipo, precio) {
		this.tipo = tipo,
		this.precio = precio;
		
	}
	getTipoPapa(){
		return this.tipo
	}
	getPrecio() {
		return this.precio;
	}
	
}

class Pedido {
	constructor(lomo, bebida, papa) {
		this.lomo = lomo;
		this.bebida = bebida;
		this.papa = papa;
	}
	getlomo() {
		return this.lomo;
	}
	getBebida() {
		return this.bebida;
	}
	getPapa() {
		return this.papa;
	}
}


//DOM
let divDestino = document.getElementById('titulos')
let titulo = document.createElement('h1')
titulo.innerHTML = "Bienvenidos a Lomoteca Emiliano's"
divDestino.append(titulo)

let subtitulo = document.createElement('h2')
subtitulo.innerHTML = 'MENU<hr>'
divDestino.append(subtitulo)


for (MenuLomo of lomos) {
	let nuevoEle = document.createElement('p');
	nuevoEle.innerHTML = `${MenuLomo.tipo}: <b>El lomo ${MenuLomo.tipo} lleva ${MenuLomo.ingredientes} </b> <br> <img src="${MenuLomo.imagen}" alt="${MenuLomo.tipo}"height="100 px" width="100 px">`					  
	divDestino.appendChild(nuevoEle);
	
}

let precioInd = document.createElement('p')
precioInd.innerHTML = '<b> EN TU PEDIDO TAMBIEN PUEDES INCLUIR PAPAS Y BEBIDA!!</b>'
divDestino.append(precioInd)

//MOSTRAR PRECIOS METODO FETCH
let lista = document.getElementById("boton")
let botonDos = document.getElementById('pedidoDos')
let contenidoLista = document.getElementById('lista')
lista.addEventListener('click', () => {
	contenidoLista.innerHTML = ''
fetch('datos.json')
	.then((resp)=>resp.json())
	.then( (data) => {
	data.forEach((producto) => {
	const listaDos = document.createElement('li')
	listaDos.innerHTML = `
	${producto.tipo}: ${producto.precio}
	`
	contenidoLista.append(listaDos)
		    
		
	})
	})
	botonDos.style.display = 'block'
})
botonDos.addEventListener('click', () => {
	contenidoLista.innerHTML = ''
	botonDos.style.display = 'none'

})

setTimeout(()=> {
	Swal.fire({
		position: 'top-end',
		icon: 'info',
		title: '<p style=color:black> OFERTA ESPECIAL!</p>',
		text: '10% de DESCUENTO llevandote un pedido de mas de $1500. APROVECHA!',
		showConfirmButton: false,
		timer: 10000
	  })
}, 2000)


//FORMULARIO
let formLomo = document.getElementById('formulario');

formLomo.addEventListener('submit', form => {
	form.preventDefault();
	
	let nombre = document.getElementById('nombre')
    let edad = document.getElementById('edad')
    let direccion = document.getElementById('direccion')
	
	// let texto = document.getElementById('pedidoTexto')
	// texto.innerHTML = 'PEDIDO CONFIRMADO'
	                            

	let lomoForm = document.getElementById('lomo');                                                                                       
	let bebidaForm = document.getElementById('bebida');
	let papasForm = document.getElementById('papa');

	let precioLomo = lomos.find(e => e.tipo == lomoForm.value);
	let precioPapas = papas.find(e => e.tipo == papasForm.value);
	let precioBebida = bebidas.find(e => e.marca == bebidaForm.value);


	let lomoPedidoUno = new Lomo(lomoForm.value, precioLomo.precio);
	let papasPedidoUno = new Papa(papasForm.value, precioPapas.precio);
	let bebidasPedidoUno = new Bebida(bebidaForm.value, precioBebida.precio);

	let unPedido = new Pedido(lomoPedidoUno, papasPedidoUno, bebidasPedidoUno)

	let precio = parseInt(
		lomoPedidoUno.getPrecio() + papasPedidoUno.getPrecio() + bebidasPedidoUno.getPrecio()
    );
    let oferta = (precio * 10)/100
	let totalOF = precio - oferta

	let PapasSiNo = papasPedidoUno.getTipoPapa() == "no" ? false : true;
    let message = PapasSiNo ? 'con papas ' + papasPedidoUno.getTipoPapa() : '';

    let BebidasSiNo = bebidasPedidoUno.getMarca() == "no" ? false : true;
    let messageBebida = BebidasSiNo ? 'con bebida ' + bebidasPedidoUno.getMarca() : '';

	
	if(nombre.value === '' || edad.value === '' || direccion.value === ''){
		Swal.fire({
			icon: 'error',
			title: 'El pedido no se ha completado',
			text: 'Los datos personales son obligatorios ',
			
		  })          
	}else{
		if(precio > 1500){
			
			DatosPedidos.push(unPedido)
			Swal.fire(
				'<p style=color:green>PEDIDO CONFIRMADO</p>',
				` <b>${nombre.value}, tu lomo es  ${lomoPedidoUno.getTipoLomo()} ${messageBebida}  ${message} y el precio total es ${totalOF} <br> Pronto te lo llevaremos a la direccion: ${direccion.value}</b>`,
				'success'
			)

		}else {
			DatosPedidos.push(unPedido)

				Swal.fire(
					'<p style=color:green>PEDIDO CONFIRMADO</p>',
					` <b>${nombre.value}, tu lomo es  ${lomoPedidoUno.getTipoLomo()} ${messageBebida}  ${message} y el precio total es ${precio} <br> Pronto te lo llevaremos a la direccion: ${direccion.value}</b>`,
					'success'
				)
			
				setTimeout(()=> {
					Toastify({
						text: "GRACIAS POR PASARTE POR LOMOTECA EMILIANO'S",
						position: "center",
						style: {
							background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(10,10,105,1) 31%, rgba(0,212,255,1) 100%)",
						}
					}).showToast();
				}, 2000)
			}

	}

	localStorage.setItem('Pedidos', JSON.stringify(DatosPedidos))


	// let textoDos = document.getElementById('titulo')
	// let pedidoDos = document.getElementById('pedido')
	// textoDos.innerHTML = ` Tu lomo es  ${lomoPedidoUno.getTipoLomo()} ${messageBebida}  ${message} y el precio total es ${precio}`
	// pedidoDos.appendChild(textoDos)

	
});


})

