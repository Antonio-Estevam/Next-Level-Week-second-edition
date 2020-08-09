import React, {useState, FormEvent} from 'react';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import warningIcon from '../../assets/images/icons/warning.svg';
import './styles.css';
import api from '../../services/api';

function TecherForm(){
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems,setScheduleItems] = useState([
        { wek_day: 0, from:'', to:'' }

    ]);
    function addNewScheduleItem(){
        setScheduleItems([
            ...scheduleItems,
            ({ wek_day: 0, from:'', to:'' })
        ]);        
    }

    function handleCreateClass(e: FormEvent){
        e.preventDefault();

        console.log({
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost
        });
        

    }

    return(
        <div id="page-techer-form" className="conteiner">
           <PageHeader
            title="Que incrivel que você quer dar aulas."
            description=" O peimeiro passo é preencher esse formulário de inscrição"
            /> 

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        
                        <Input 
                            name="name" 
                            label="Nome completo" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input 
                            name="avatar" 
                            label="Avatar" 
                            value={avatar} 
                            onChange={(e) => setAvatar(e.target.value)}
                        />

                        <Input 
                            name="whatsapp" 
                            label="Whatsapp" 
                            value={whatsapp} 
                            onChange={(e) => setWhatsapp(e.target.value)}
                        />

                        <Textarea 
                            name="bio" 
                            label="Biografia" 
                            value={bio} 
                            onChange={(e) => setBio(e.target.value)}
                        />

                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select
                        name="subject"
                        label="Matéria"
                        value={subject} 
                        onChange={(e) => setSubject(e.target.value)}
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
                        <Input 
                            name="cost" 
                            label="Custo da sua hora por aula" 
                            value={cost} 
                            onChange={(e) => setCost(e.target.value)}
                        />

                    </fieldset>

                    <fieldset>
                        <legend>
                            Horário disponíveis
                            <button type="button"  onClick={addNewScheduleItem}>
                            + Novo horário
                            </button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.wek_day} className="schedule-item">
                                <Select
                                name="week-day"
                                label="Dia da semana"
                                onChange={e => setScheduleItemsValue(index, '')}
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
        
                            <Input name="from" label="Das" type="time"/>
                            <Input name="to" label="Até" type="time"/>
                                </div>
                            );
                        })}

                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"/>
                            Importante! <br/>
                            Preencha todos os campos
                        </p>

                        <button type="submit">
                            Salvar cadastro 
                        </button>
                    </footer>
                </form>
            </main>

        </div>
    )
}

export default TecherForm;