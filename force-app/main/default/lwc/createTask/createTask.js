import { LightningElement,api } from 'lwc';
import saveToDo from '@salesforce/apex/ToDoController.saveToDo';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class CreateTask extends LightningElement {
    @api targetParent;
    taskTitle;
    dueDate;
    showSave=false;
    connectedCallback(){
    this.targetParent != true ? (this.showSave=true):(this.showSave=false);
    }
    handleOnChange(event){
        const fieldName=event.target.name;
        if(fieldName==='taskTitle'){
            this.taskTitle=event.target.value;
        }
        else if(fieldName==='dueDate'){
            this.dueDate=event.target.value;
        }
        
    }

    handleClick(){
        console.log("Button clicked on child");
        saveToDo({title:this.taskTitle,dueDate:this.dueDate}).then(
            (result)=>{
                if(result==='Success'){
                    this.taskTitle='';
                    this.dueDate='';
                    const evt=new ShowToastEvent({
                        title:'Success',
                        message:'A new item saved to your todo list',
                        variant:'success'
                    });
                    this.dispatchEvent(evt);
                    this.dispatchEvent(new CustomEvent('refreshtodo'));
                    if(this.targetParent===true){
                    this.dispatchEvent(new CustomEvent('closetodo'));
                }
                }
            }
            
        ).catch((error)=>{
            console.log("Error: ", error);
            const evt=new ShowToastEvent({
                title:'Error',
                message:error.body.message,
                variant:'error'
            });
            this.dispatchEvent(evt);
        });
    }
    
    @api 
    handleParentClick(){
        this.handleClick();
    }
}