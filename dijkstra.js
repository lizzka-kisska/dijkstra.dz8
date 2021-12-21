let fs = require("fs");
let s = fs.readFileSync('input.txt').toString();
let stack = new Array();
let res1 = new String();
let n = "";
console.log(eval(s));//неправильно для ^
s = s.split(' ').join('');

function prio(char) {
    if (char=='+' || char=='-')
        return 0;
    else if (char=='*' || char=='/')
        return 1;
    else if (char=='^')
        return 2;
    return -1;
}
let i=0;
for (let i=0; i<s.length; i++){
    if (isNaN(s[i])){
        if (s[i]=='(' || stack[stack.length - 1]=='(' || stack.length==0){
            stack.push(s[i]);
            continue;
        }
        if (s[i]==')'){
            while (stack[stack.length - 1]!='('){
                res1 += stack[stack.length - 1] + " ";
                stack.pop();
            }
            stack.pop();
            continue;
        }
        if (prio(s[i])>prio(stack[stack.length - 1])){
            stack.push(s[i]);
            continue;
        }
        if (prio(s[i])<=prio(stack[stack.length - 1])){
            while (prio(s[i])<=prio(stack[stack.length - 1])){
                res1 += stack[stack.length - 1] + " ";
                stack.pop();
            }
            stack.push(s[i]);
            continue;
        }
    }
    else{
        n += s[i]
        if (isNaN(s[i+1])){
            res1 += Number(n) + " ";
            n = "";
        }
    }    
}
while(stack.length!=0){
    res1 += stack[stack.length - 1] + " ";
    stack.pop();
}
console.log(res1);
res1 = res1.split(' ').join('');
// console.log(res1);
for (let i=0; i<res1.length; i++){
    if (isNaN(res1[i])){
        let n2 = parseInt(stack.pop()), n1 = parseInt(stack.pop());
        if (res1[i]==='+')
            stack.push(n1+n2);
        else if (res1[i]==='-')
            stack.push(n1-n2);
        else if (res1[i]==='*')
            stack.push(n1*n2);
        else if (res1[i]==='/')
            stack.push(n1/n2);
        else if (res1[i]==='^')
            stack.push(Math.pow(n1, n2));
    }
    else 
        stack.push(res1[i]);
}
console.log(stack.pop());