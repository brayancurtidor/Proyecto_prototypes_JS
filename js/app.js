//constructores

function SeguroObj(marcaP,yearP,tiposeguroP){
    this.marcaP=marcaP;
    this.yearP=yearP;
    this.tiposeguroP=tiposeguroP;
}
//realiza la cotizacion con los datos

SeguroObj.prototype.cotizarSeguros2=function()
{
    /*
    1= Americano 1.15
    2= Asiatico 1.05
    3=Europeo 1.35
     */
    let cantidad;
    const base=2000;
    switch(this.marcaP)
    {
        case '1':
            cantidad=base * 1.15;
            break;
        case '2':
            cantidad=base * 1.05;
            break;
        case '3':
            cantidad=base * 1.35;
            break;
        default:
            break;
    }
    //leer año
    const diferenciayear=new Date().getFullYear()-this.yearP
    //cada año q la diferencia es mayor, el costo va a reducirse  un 3%
    cantidad-=((diferenciayear*3)*cantidad/100);
    /*
    si el servicio es basico se multiplica por un 30% mas
    si el servicio es completo se multoiplica por un 50%
    */
   if(this.tiposeguroP==='basico')
   {
    cantidad*=1.30;
   }
   else
   {
    cantidad*=1.50;
   }
    
    return cantidad;



}
function interfazusuario()
{


}
//prototipo para la interfaz ya que los años se generan con javascript
interfazusuario.prototype.llenarOpciones=()=>{
    const max=new Date().getFullYear(); //traer los años
    const min=max-20; //sera año acutal menos 20 años, que se mostrarasn en el selector
    const selectordeFechas=document.querySelector('#year');
    for(let i=max;i>min;i--)
    {
        let opcion=document.createElement('option');
        opcion.value=i;
        opcion.innerHTML=i;
        //agregar a ala etiqueta selector las opciones
        selectordeFechas.appendChild(opcion)
    }
}
//muestra alertas en pantalla
interfazusuario.prototype.mostraralertaError=(memsaje,tipomensaje)=>{
const div=document.createElement('div');
if(tipomensaje==='error')
{
    div.classList.add('error','mt-10');
    div.textContent=memsaje;

}else
{
    div.classList.add('correcto');
    div.textContent=memsaje;
}
div.classList.add('mensajes','mt-10')

//crear el html dentro del formulario
const formulariohtml=document.querySelector('#cotizar-seguro');
formulariohtml.insertBefore(div,document.querySelector('#resultado')); //dentro del before el primer elemento es la nueva etiqueta y el segundo es la etiqueta en la que el div se pondra antes que la segunda etiqueta
setTimeout(() => {
    div.remove();
},2000);
}

interfazusuario.prototype.MostraResultado=(total,seguro)=>{
    //dstructurin para con¿mbinar ambas structuras
    const {marcaP,yearP,tiposeguroP}=seguro //seguro es la variable que le estoy pasando como parametro
    // crear resultado html
    let maracatexto;
    switch(marcaP)
    {
        case '1':
            maracatexto='Americana'
        break;
        case '2':
            maracatexto='Asiatico'
        break;
        case '3':
            maracatexto='Europea'
        break;
        default:
            break
    }

    const divresultado=document.createElement('div');
    
    divresultado.classList.add('mt-10');
    divresultado.innerHTML=`
    <p class="header">Tu reseumen</p>
    <p class="font-bold">Marca: <span class="font-normal"> ${maracatexto}</span></p> 
    <p class="font-bold">año: <span class="font-normal"> ${yearP}</span></p>
    <p class="font-bold">tipo: <span class="font-normal"> ${tiposeguroP}</span></p>
    <p class="font-bold">Total: $<span class="font-normal"> ${total}</span></p>

    `
    const resultadodivdiv=document.querySelector('#resultado')

    const spiner=document.querySelector('#cargando')
    spiner.style.display='flex';
    setTimeout(() => {
        spiner.style.display="none"; //este se va
        resultadodivdiv.appendChild(divresultado); //y en su lugar viene este
    },3000);
}

//instancia de interfaz usuario
const instanciadeinterfaz=new interfazusuario();


document.addEventListener('DOMContentLoaded',()=>{
    instanciadeinterfaz.llenarOpciones(); //lenaria los selecto con los años
});
//validaciones en el fromulario
listadodeEventos();
function listadodeEventos()
{
    const formulariohtml=document.querySelector('#cotizar-seguro');
    formulariohtml.addEventListener('submit',cotizarseguro); //submit ya que hay un boton dentro de este formulari oque tiene un submir dentro de el

}
//aqui se llenaran los objetos tambien y se validan 
function cotizarseguro(e)
{
    e.preventDefault();
    //leer la marca seleccionada
    const marcahtml1=document.querySelector('#marca').value;
    console.log(marcahtml1)
    //leer la año
    const selectordeFechashtml=document.querySelector('#year').value;
    console.log(selectordeFechashtml)
    //leer la cobertura seleccionada radios buttons
    //caracteristica es que tienen el mismo nombre pero el valor distinto
    const coberturaBut=document.querySelector('input[name="tipo"]:checked').value; //seleccioanr el buton que se esta selecionado
    console.log(coberturaBut)
    if(marcahtml1===''|| selectordeFechashtml===''||coberturaBut==='')
    {
        instanciadeinterfaz.mostraralertaError('toodos los campos son obligatorios','error') //lo puedo mandar a llamar por aca por que el objero esta global
        return
    }

    //ocultar las cotizaciones previas, no se elimina el html por que estamos usando protoyupes
    const rsultados =document.querySelector('#resultado div'); //seleccionare el div dentro del resultado
    if(rsultados!=null) //cuando inicia la etiqueta con el id resultadoesya vacia, y media vez le damos al boton se va llenando 
    {
        rsultados.remove(); //cuando tenga un vid entonces lo va a eliminar
    }



    instanciadeinterfaz.mostraralertaError('Cotizando...','exito')
    
    //instancias del seguro del objeto
    const seguro= new SeguroObj(marcahtml1,selectordeFechashtml,coberturaBut); //son las variables que se les paso los valores de las etiquetas
    const total =seguro.cotizarSeguros2(); //mandando a llamar la funcion prototipo de la instancia de segurosobj y tambien el resultado de esa funcion se le asigna a una variable


    //utilizar el prototipo a utilizar
    instanciadeinterfaz.MostraResultado(total,seguro);


}