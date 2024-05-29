public with sharing class ToDoController {
    
    @AuraEnabled
    public static string saveToDo(String title, Date dueDate){
        try {
            Todo__c todo=new Todo__c();
            todo.Title__c=title;
            todo.Due_Date__c=dueDate;
            insert todo;
            return 'Success';
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Todo__c> getToDoList(String taskStatus){
        return [select Id, Title__c, Due_Date__c from Todo__c where Status__c=:taskStatus order by Due_Date__c];
    }

    @AuraEnabled
    public static string updateToDo(Id toDoId){
        try {
            Todo__c todo=[select Id, Status__c from Todo__c where Id=:toDoId];
            todo.Status__c='Completed';
            update todo;
            return 'Success';
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}