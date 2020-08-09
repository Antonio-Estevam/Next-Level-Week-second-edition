import React from 'react';

import whatsapp from '../../assets/images/icons/whatsapp.svg';

 import'./styles.css';
import api from '../../services/api';

 export interface Teacher{
    "id": number,
    "subject": string,
    "cost": number,
    "name": string,
    "avatar": string,
    "whatsapp": string,
    "bio": string
    };
 interface TeacherItemProps{
    techer: Teacher;
 }

 const  TeacherItem: React.FC<TeacherItemProps> = ({techer}) => {
     
    function createNewConnection(){
        api.post('connections', {
            user_id: techer.id
        });
    }

     return(
        <article className="teacher-item">
                   <header>
                       <img src={techer.avatar} alt={techer.name}/>
                        <div>
                            <strong>{techer.name}</strong>
                            <span>{techer.subject}</span>
                        </div>
                   </header>

                   <p>
                       {techer.bio}
                   </p>

                   <footer>
                       <p>
                           Preço/hora
                           <strong>{techer.cost}</strong>
                       </p>
                       <a 
                       target="_blank"
                       onClick={createNewConnection} 
                       href={`https://wa.me/${techer.whatsapp}?text=Gostaria%20de%20agendar%20um%20aula`}>
                           <img src={whatsapp} alt="Whatsapp"/>
                           Entrar em contato 
                       </a>
                   </footer>

               </article>
     );
 }

 export default TeacherItem;