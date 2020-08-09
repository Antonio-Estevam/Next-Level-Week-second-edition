import React, {useState, FormEvent} from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, {Teacher} from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

import './stylees.css';

function TecherList(){
    const [teachers, setTechers] = useState([]);

    const [subject, setSubject] = useState('');
    const [wek_day, seteWek_day] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent){
        e.preventDefault();

        const response = await api.get('clases', {
           params:{
            subject,
            wek_day,
            time,
         }
        }); 

        setTechers(response.data); 
    }

    return(
        <div id="page-techer-list" className="conteiner">
           <PageHeader title="Estes são os proffs disponiveis.">
               <form id="search-teachers" onSubmit={searchTeachers}>
               <Select
                     name="subject"
                     label="Matéria"
                     value={subject}
                     onChange={(e) => {setSubject(e.target.value)}}
                     options={[
                         { value: 'Artes', label:'Artes'},
                         { value: 'Biologia', label:'Biologia'},
                         { value: 'Ciências', label:'Ciências'},
                         { value: 'Educação Física', label:'Educação Física'},
                         { value: 'Física', label:'Física'},
                         { value: 'Geografia', label:'Geografia'},
                         { value: 'História', label:'História'},
                         { value: 'Matemática', label:'Matemática'},
                         { value: 'Português', label:'Português'},
                         { value: 'Qímica', label:'Qímica'}
                     ]}
                    />

                    <Select
                     name="wek-day"
                     label="Dia da semana"
                     value={wek_day}
                     onChange={(e) => {seteWek_day(e.target.value)}}
                     options={[
                         { value: '0', label:'Domingo'},
                         { value: '1', label:'Segunda-feira'},
                         { value: '2', label:'Terça-feira'},
                         { value: '3', label:'Quarta-feira'},
                         { value: '4', label:'Quinta-feira'},
                         { value: '5', label:'Sexta-feira'},
                         { value: '6', label:'Sábado'}
                     ]}
                    />
                   <Input 
                        name="time" 
                        label="Hora" 
                        type='time'
                        value={time}
                        onChange={(e) => {
                         setTime(e.target.value);
                        }}
                    />

                    <button type="submit" onClick={searchTeachers}>
                        Buscar 
                    </button>
               </form>
           </PageHeader>    

           <main>
               {teachers.map((teacher: Teacher)=>{
                   return <TeacherItem key={teacher.id} techer={teacher} />
               })}
           </main> 
        </div>
    )
}

export default TecherList;