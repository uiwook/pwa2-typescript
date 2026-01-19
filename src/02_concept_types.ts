// ----------------------------
// 타입스크립트의 집합론
// number: -1, 0, 2, 5... (무한집합)
// boolean: true, false (유한집합)
// string: 'a', 'bbb'... (무한집합)
// number, boolean, string들은 각각 하나의 집합체이다(유한/무한)
// 객체 내부의 구조(Property)를 기준으로 타입을 결정하는 구조적 타입 시스템
type Animal = {
    name: string;
}
type Human = {
    type: 'HUMAN';
    name: string;
    lang: string;
}
type Dog = {
    type: 'DOG';
    name: string;
    age: number;
}
// Animal이 Human과 Dog의 'SuperSet'(넓은 범위 타입)이 된다.
// 여기서 type Human과 Dog는 'SubSet'이라고 한다.
// 조건이 적을수록 SuperSet에 가까워진다.

// ----------------------------
// 타입 호환성: A와 B 두개의 타입이 존재할 때, A타입의 값을 B타입으로 취급해도 괜찮은지 판단하는 것
let num1: number = 1;
let num2: 2 = 2;
num1 = num2; // 호환 가능
// num2 = num1; // 호환 불가능

// Upcasting : 자식 type을 부모 type으로 취급한다.
// Downcasting도 존재하는데, ts에서는 비허용이다.
// 참조형태이기 때문에 한쪽 값이 바뀌면 모두 값이 바뀐다.
const dog: Dog = { name: '흰둥이', age: 20};
const animal: Animal = dog;
// type Animal에는 name밖에 들어갈 수 없기 때문에, age에 접근할 수 없다.
animal.name;
// animal.age; // Animal.age는 없는 프로퍼티
// const dog2: Dog = animal; // Downcasting은 비허용

// ----------------------------
// 초과 속성 체크
// 객체 리터럴을 직접 대입하는 상황에서 실수 방지를 위해 더 엄격하게 체크
const animal2: Animal = { name: '검둥이', age: 20 };

// ----------------------------
// 타입 추론: 명시적으로 타입을 적지 않아도, 타입스크립트가 코드를 분석해ㅓ 타입을 결정하는 기능
// 일반 변수의 타입추론
let num3 = 1; // number로 타입추론
const num4 = 1; // 1 number literal로 타입추론

// 객체의 타입추론
let obj = { name: '홍길동', age: 20 }; // 객체 내부의 literal값으로 타입추론
obj = { lang: 'ko' } // error

// 구조 분해 할당의 타입추론
let [num5, str5, bool5] = [1, 'str', true]; // 각 요소에 맞게 타입추론
// : [number, string, boolean]를 자동처리 해준다.

// 함수의 리턴 타입 추론
function test1(a: number, b: number) {
    return a + b;
};

// 기본값이 설정된 파라미터의 타입 추론
function test2(msg = 'test') {
    return 'hi';
};

// 최적 공통 타입추론
let arr = [1, 'hi', false];

// ----------------------------
// 타입 단언: 개발자가 해당 타입에 대해 확실한 정보를 가지고 있을 때,
//           컴파일러에게 특정 타입을 강제로 지정하는 기능
let num6 = 10 as never;
let num7 = 10 as string; // 슈퍼셋 또는 서브셋이 아닌 타입으로는 단언 불가능

const main = document.querySelector('main') as HTMLElement;

// Non-null, 단언 연산자: 값이 null이나 undifined가 아님을 확실 할 때, `!`를 이용해서 타입단언
type User = {
    name: string;
    age?: number;
};
const user: User = { name: '홍길동' }
user.name.toString();
user.age.toString(); // undifined나 null일 수도 있기 때문에 그냥 사용하면 오류
user.age!.toString(); // 단언해서 무조건 실행시키기 때문에, 오류가 나면 서버멈춤

// const 단언: 모든 프로퍼티가 readonly를 갖도록 단언 가능
let user2 = {
    name: '둘리'
    ,age: 40
} as const;

// ----------------------------
// 타입 좁히기 : 여러 타입이 섞여있는 상황에서, 조건문을 통해 특정 범위로 타입을 제한
// typeof val로 null을 검사하게 되면 null이 아닌 object로 오기때문에 주의!
function printVal(val: number | string | null): void {
    if(typeof val === 'number') {
        console.log(val.toFixed(2));
    } else if(typeof val === 'string') {
        console.log(val.toUpperCase());
    } else {
        console.log('null이다.');
    }
}

// 객체의 타입 좁히기: `in`연산자 이용
function whatIsKinds(animal: Human | Dog) {
    if('lang' in animal) {
        animal.lang;
    } else {
        animal.age;
    }
}

// 클래스 인스턴스 좁히기: `instanceof` 연산자
class Dog2 { bark: string = '멍'; }
class Cat2 { walk: string = '사뿐사뿐'; }
function chkClass(animal: Dog2 | Cat2) {
    if(animal instanceof Dog2) {
        animal.bark
    }else {
        animal.walk
    }
}

// 서로소 유니온 타입 좁히기
// type내부에 서로소 key와 리터럴값 있어야 함(DB에서 type이라는 이름 사용하지 않기)
function test3(animal: Dog | Human) {
    if(animal.type === 'HUMAN') {
        animal.lang;
    } else {
        animal.age;
    }
}