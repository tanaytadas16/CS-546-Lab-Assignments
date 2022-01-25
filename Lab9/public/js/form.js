function checkPalindrome(str) {
    if (!str) throw 'Empty text is supplied in the body';
    str = str.split('').reverse().join('');
    return str;
}
function removeSpecial(str) {
    return (str = str.replace(/\W/g, '').toLowerCase());
}
let myform = document.getElementById('myform');
let text = document.getElementById('phrase');
let errorContainer = document.getElementById('error-container');
let errorTextElement = document.getElementsByClassName(
    'alert text-goes-here'
)[0];
let ul = document.getElementById('attempts');
let result;
let searchbox = document.getElementById('searchbox');
//let listheading = document.getElementById('listheading');

if (myform) {
    myform.addEventListener('submit', (event) => {
        event.preventDefault();
        // if (typeof text.value !== "string")
        //     throw
        if (text.value.trim()) {
            errorContainer.hidden = true;
            let string = this.removeSpecial(text.value);

            if (!string) {
                text.value = '';
                errorTextElement.textContent = 'Invalid text supplied';
                errorContainer.hidden = false;
                text.focus();
            }
            result = this.checkPalindrome(string);

            if (result == this.removeSpecial(text.value)) {
                let li = document.createElement('li');
                li.classList.add('is-palindrome');
                li.innerHTML = text.value;
                ul.appendChild(li);
            } else {
                let li = document.createElement('li');
                li.classList.add('not-palindrome');
                li.innerHTML = text.value;
                ul.appendChild(li);
            }
            myform.reset();
            text.focus();
        } else {
            text.value = '';
            errorTextElement.textContent = 'Input text is empty';
            errorContainer.hidden = false;
            text.focus();
        }
    });
}
