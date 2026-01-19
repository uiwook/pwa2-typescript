// ------------------------
// 함수의 타입 정의
function sum(a: number, b: number): number {
    return a + b;
}

const sum2 = (a: number, b: number): number => {
    return a + b;
}

// ------------------------
// 선택적 파라미터
function print1(name: string, age?: number ): void {
    console.log(`${name}: ${age}`);
}
print1('홍길동');
print1('홍길동', 20);

// 필수 파라미터가 선택적 파라미터보다 뒤에 작성되면 안된다.
function print2(name: string, age?: number, gender: string) {
    console.log(`${name}: ${age}: ${gender}`);
}

// ------------------------
// Rest 파라미터
function sumAll(...numbers: number[]): number {
    let sum = 0;
    numbers.forEach(val => {
        sum += val
    });

    // for (const val of numbers) {
    //     sum += val;
    // }
    return sum
    // 배열 모두 더하는데에는 reduce가 쉽다.
    // return numbers.reduce((acc, cur) => acc + cur);
}
sumAll(1);
sumAll(1, 2);
sumAll(1, 2, 3, 4, 5);

// ------------------------
// 함수 타입 표현식
const add = (a: number, b: number): number => a + b;
const sub = (a: number, b: number): number => a - b;
const mul = (a: number, b: number): number => a * b;
const div = (a: number, b: number): number => a / b;

// 위에 코드를 함수 타입 표현식으로 정의
type Oper = (a: number, b: number) => number;
const addEx: Oper = (a, b) => a + b;
const subEx: Oper = (a, b) => a - b;
const mulEx: Oper = (a, b) => a * b;
const divEx: Oper = (a, b) => a / b;

// ------------------------
// 호출 시그니처 : 객체 정의 안에 함수의 형태를 기술하는 방식
type Animal = {
    (name: string): void; // 함수의 호출 시그니처
    age: number;
}
const human: Animal = (name) => console.log(`${name}`);
human.age = 20;

// ------------------------
// 함수의 타입 호환성
// 리턴의 타입 호환성: 업캐스팅 일 때만 호환 가능
type FunA = (num: number) => number;
type FunB = (num: number) => 10;

let funA: FunA = (num) => num;
let funB: FunB = (num) => 10;
funA = funB;
funB = funA; // Error

// 파라미터의 타입 호환성: 다운캐스팅에서 허용
type FunC = (num: number) => void;
type FunD = (num: 10) => void;
let funC: FunC = num => num;
let funD: FunD = num => num;
funC = funD; // Error
funD = funC;

// ------------------------
// 함수 오버로딩: 하나의 함수명에 여러개의 파라미터 조합을 선언하는 기능
// 1. 오버로드 시그니처: 구현부 없이 선언부만 만들어둔 함수
function addOver(a: number, b: number): number;
function addOver(a: number, b: number, c: number, d: number): number;

// 2. 구현 시그니처: 구현부를 정의하는 함수
function addOver(a: number, b: number, c?: number, d?: number): number {
    if(typeof c === 'number' && typeof d === 'number') {
        return a + b + c + d;
    } else {
        return a + b;
    }
}
addOver(1, 2);
addOver(1, 2, 3); // Error: 파라미터가 3개인 시그니처는 정의하지 않았으므로 에러 발생
addOver(1, 2, 3, 4);

// ------------------------
// 사용자 정의 타입 가드: `is` 키워드를 활용해서 타입을 좀히는 방법(되도록이면 서로소 유니온을 먼저 이용할 것)
type Cat = { meow: () => void };
type Dog = { bark: () => void };

function isCat(animal: Cat | Dog): animal is Cat {
    return (animal as Cat).meow !== undefined;
}

function speak(animal: Cat | Dog) {
    if(isCat(animal)) {
        animal.meow();
    } else {
        animal.bark();
    }
}