drop database if exists quiz_db;
create database quiz_db;
use quiz_db;

drop user if exists comp4537_individual_assignment@localhost;
create user comp4537_individual_assignment@localhost identified with mysql_native_password by 'bad_password';
grant all privileges on quiz_db.* to comp4537_individual_assignment@localhost;
flush privileges;

create table questions(
    questionId int auto_increment not null ,
    description varchar(100) not null,
    correctAnswerIndex int not null,
    primary key (questionId)
);

create table choices(
    choiceId int auto_increment,
    description varchar(100) not null,
    questionId int not null,
    primary key(choiceId),
    foreign key (questionId)
        references questions (questionId)
        on update cascade
        on delete cascade
);

delimiter $$

create procedure create_question(in question_description varchar(40), in p_correctAnswerIndex int)
begin
    insert into questions(description, correctAnswerIndex) values (question_description, p_correctAnswerIndex);
    select last_insert_id() as 'questionId';
end;

create procedure add_choice(in choice_description varchar(40), in p_questionId int)
begin
    insert into choices(description, questionId) values (choice_description, p_questionId);
end; $$

create procedure get_questions()
begin
    select q.questionId, q.description as questionDescription, q.correctAnswerIndex, c.choiceId, c.description as choiceDescription from questions q
        join choices c on q.questionId = c.questionId
        order by (q.questionId);
end; $$


create procedure update_question(in p_questionId int, in p_description varchar(100), in p_correctAnswerIndex int)
begin
    update questions q
        set q.description = p_description,
            q.correctAnswerIndex = p_correctAnswerIndex
        where q.questionId = p_questionId;
    delete from choices c where c.questionId = p_questionId;
end; $$

delimiter ;


