// ---------------------------
// 클래스 상속 - 아래에서부터 공통적인 것 묶어서 올라온다(추상화)
// ---------------------------
class Mammal {
    constructor(
        protected name: string,
        protected residence: string,
    ) {
        this.name = name;
        this.residence = residence;
        console.log('마멀');
    }

    public breath(): void {
        console.log(`${this.name}이/가 폐호흡합니다.`);
    }
}

class Whale extends Mammal {
    constructor(name: string, residence: string) {
        // 자식쪽에서 생성자, 메소드를 정의할 경우, 반드시 부모 생성자를 먼저 호출하고,
        // 후속 처리를 해야한다. + super는 항상 최우선(최상단) 실행
        super(name, residence);
        console.log('자식Class 고래');
    }

    // 오버라이딩: 부모에게 상속받은 메소드를 자식이 재정의하여 사용하는 것
    // v4.3+부터 `override` 키워드를 메소드명 앞에 붙여 명시
    override breath(): void {
        console.log(`${this.name}이/가 숨쉽니다.`);
    }

    public swimming(): void {
        console.log(`${this.name}이/가 헤엄칩니다.`);
    }
}

class FlyingSquirrel extends Mammal {
    // 자식쪽의 생성자를 생략할 경우, 자동으로 부모 생성자를 호출

    public flying(): void {
        console.log(`${this.name}이/가 날아갑니다.`);
    }
}

const whale: Whale = new Whale('고래', '바다');
const flyingSquirrel: FlyingSquirrel = new FlyingSquirrel('날다람쥐', '산');

whale.breath();

// 오버라이딩
// 상속된 method를 받지않고, 새롭게 재정의하여 사용