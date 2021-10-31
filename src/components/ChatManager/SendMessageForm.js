import { Form, InputGroup,  FormControl} from 'react-bootstrap';
import {Button} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';


const SendMessageForm = ({ sendMessage }) => {

    const [message, setMessage] = useState('');
    return <Form
    onSubmit={e => {
        e.preventDefault();
        sendMessage(message);
        setMessage('');
    }}>
        <InputGroup>
            <FormControl style={{width:400, height:30}} type="user" placeholder="message..."
            onChange={e => setMessage(e.target.value)} value={message} />  
            <Button style={{width:100, height:30}} variant="contined" type='submit' disabled={!message} endIcon={<SendIcon />}>Send</Button>
        </InputGroup>
    </Form>
}

export default SendMessageForm;