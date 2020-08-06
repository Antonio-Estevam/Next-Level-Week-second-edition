import React from 'react';

import whatsapp from '../../assets/images/icons/whatsapp.svg';

 import'./styles.css';

 function TeacherItem(){
     return(
        <article className="teacher-item">
                   <header>
                       <img src="https://avatars3.githubusercontent.com/u/47607852?s=460&u=1980faa32b1d65f74cf96f88cb8833822b60288e&v=4" alt="Jhonny"/>
                        <div>
                            <strong>Jhonny Estevam</strong>
                            <span>Química</span>
                        </div>
                   </header>

                   <p>
                       Entusiasta da melhores tecnologia de química avançada.
                       <br/><br/>
                       Apaixonado por explodir coisas em laboratório e por mudar a vida de pessoas através de experiênciaas. 
                   </p>

                   <footer>
                       <p>
                           Preço/hora
                           <strong>80,00</strong>
                       </p>
                       <button type="button">
                           <img src={whatsapp} alt="Whatsapp"/>
                           Entrar em contato 
                       </button>
                   </footer>

               </article>
     );
 }

 export default TeacherItem;