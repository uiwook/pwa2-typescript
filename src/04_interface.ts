// -----------------------
// interface는 미리 값을 넣어둘 수 없다.(설계서의 역할만 함)
interface User {
    readonly id: number;
    name: string;
    age?: number;
}

const user: User = {
    id: 1,
    name: '홍길동',
};
// user.id = 2; // error: readonly 설정하면 변경 불가능

// 나중에 Class배울 때 상세로 배울 내용
// type Dog = {
//     name: string;
//     age: number;
// }

// class ClassA implements Dog {
//     name: string = '1';
//     age: number = 1;
//     lang: string = 'ko';
// }

// -----------------------
// 인터페이스 확장
// `extends` 키워드를 사용해서 기존 인터페이스를 상속해서 확장해나가는 기법
interface Animal {
    name: string;
}
interface Human extends Animal{
    age: number;
}

interface Douner extends Animal, Human{ // Human만 적더라도, name을 상속받아 옴
    kinds: string;
}
// 다른 언어들에는 interface에 extends가 없고, 다중상속은 없다.
// 의존성 및 설계&관리 issue로 다중상속을 하지 않도록 막고있다.

// -----------------------
// 선언 병합
interface Dog { name: string; }
interface Dog { age: number; }
const dog: Dog = {
    name: '흰둥이',
    age: 3
}

// -----------------------
// 메소드 정의
interface Dog {
    // 함수 타입 프로퍼티 방식
    barking: (arg: Animal) => void;
    
    // 메소드 시그니처 방식: 조건이 조금 느슨하다
    barking2(arg: Animal): void;
}
let humanBarking = (arg: Human) => console.log(arg.name);
const dog2: Dog = {
    barking: humanBarking,
    barking2: humanBarking,
}

// -----------------------
// 메소드 오버로딩
interface Cat {
    // 함수 타입 프로퍼티로는 메소드 오버로딩이 불가능
    // mya: () => void; 
    // mya: (arg:string) => void;

    // 메소드 시그니처 방식으로 메소드 오버로딩 가능
    mya(): void; 
    mya(arg:string): void;
}
