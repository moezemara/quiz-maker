module.exports = {
    isanswered: class{
        constructor(student, exam, type, q_id, action) {
            this.student = student;
            this.exam = exam;
            this.type = type;
            this.q_id = q_id;
            this.timestamp = Math.floor(Date.now() / 1000);
            this.action = action;
        }

        async resolve(){
            if (action == 'begin'){
                const prev = "false";
                const next = "true";
                const end = this.student[this.type+'_end'],
                const type = this.type;
                const q_id = this.exam.questions[0].id;
                const question = this.exam.questions[0].question
                const answer = this.exam.questions[0].answers

               }
        }

        async isanswered(answer_id){
            const answer = this.student[this.type+'_answers']
            for (const exam_index in this.exam.questions) {
                const exam_question = this.exam.questions[exam_index]

            }

        }
        
        async scheme(){

        }
    }
}