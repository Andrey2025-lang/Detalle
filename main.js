        // --- JAVASCRIPT ---
        // Respuestas correctas (en minúsculas para comparación)
        const correctAnswers = {
            answer1: 'donald',
            answer2: '18/09',
            answer3: 'fresas',
        };

        // Elementos del DOM
        const questions = [
            document.getElementById('question1'),
            document.getElementById('question2'),
            document.getElementById('question3'),
        ];

        const inputs = [
            document.getElementById('answer1'),
            document.getElementById('answer2'),
            document.getElementById('answer3'),
        ];

        const hints = [
            document.getElementById('hint1'),
            document.getElementById('hint2'),
            document.getElementById('hint3'),
        ];

        const sendButtons = [
            document.getElementById('send1'),
            document.getElementById('send2'),
            document.getElementById('send3'),
        ];

        const letterContainer = document.getElementById('letterContainer');

        // Función para validar respuesta de una pregunta
        function validateAnswer(index) {
            const input = inputs[index];
            const userAnswer = input.value.trim().toLowerCase();
            const correctAnswer = correctAnswers[`answer${index + 1}`];

            if (userAnswer === correctAnswer) {
                // Respuesta correcta
                input.classList.remove('error');
                input.classList.add('success');
                hints[index].style.display = 'none';
                sendButtons[index].disabled = true;
                input.disabled = true;

                // Mostrar siguiente pregunta o carta
                if (index < questions.length - 1) {
                    questions[index].classList.remove('active');
                    questions[index + 1].classList.add('active');
                    inputs[index + 1].focus();
                } else {
                    // Todas respondidas correctamente
                    setTimeout(() => {
                        letterContainer.style.display = 'block';
                        setTimeout(() => {
                            letterContainer.classList.add('open');
                        }, 100);
                        // Opcional: hacer scroll a la carta
                        letterContainer.scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                }
            } else if (userAnswer !== '') {
                // Respuesta incorrecta
                input.classList.remove('success');
                input.classList.add('error');
                hints[index].style.display = 'block';
            } else {
                // Campo vacío
                input.classList.remove('error');
                input.classList.remove('success');
                hints[index].style.display = 'none';
            }
        }

        // Añadir event listeners a botones enviar
        sendButtons.forEach((btn, idx) => {
            btn.addEventListener('click', () => validateAnswer(idx));
        });

        // Permitir enviar con Enter en cada input
        inputs.forEach((input, idx) => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    validateAnswer(idx);
                }
            });
        });

        // Mostrar mensaje final
        function showFinalMessage() {
            const message = document.getElementById('message').value.trim();
            if (message) {
                letterContainer.innerHTML = `
                    <h2>Para Mi Amiga Especial</h2>
                    <div style="text-align: left; line-height: 1.6; font-style: italic;">
                        ${message.replace(/\n/g, '<br>')}
                    </div>
                    <p style="margin-top: 20px;">¡Gracias por ser una amiga tan maravillosa! 🎄</p>
                `;
            } else {
                alert('Por favor, escribe un mensaje antes de continuar.');
            }
        }
