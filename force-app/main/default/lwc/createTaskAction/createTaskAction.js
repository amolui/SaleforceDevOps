import { LightningElement } from 'lwc';
import {CloseActionScreenEvent} from 'lightning/actions';

export default class CreateTaskAction extends LightningElement {
    isAction=true;

    handleClick(event){
        this.refs.createTask.handleParentClick();
    }

    closeAction(){
        this.dispatchEvent(new CloseActionScreenEvent());
    }
}