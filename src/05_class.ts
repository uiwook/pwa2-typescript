// -------------------------------
// Class : 객체를 정의하기 위한 집합, 타입으로도 사용 가능
// 클래스명은 파스칼케이스로 작성
// 파일명은 클래스명과 동일하게 작성
// 기본적으로 한 시스템 내에서 클래스명은 중복 X

// static은 변경될 일이 없고, 많이 쓰이는 것에만 사용
// static은 서버가 켜지는 순간 바로 등록이 됨
// 인스턴스는 new를 이용해 인스턴스화(서버에 등록)를 하여 사용가능
// static 많으면 서버가 쓸데없이 일을 많이할 수 있으니 주의!

class Animal {
    // ------------
    // Field 정의
    // ------------
    // 인스턴스 필드
    public name: string = '동물';
    // 정적(static) 필드
    public static sName: string = '스테틱 이름';

    // ------------
    // 메소드 정의
    // ------------
    // 인스턴스 메소드
    public getName(): string {
        return '인스턴스 메소드';
    }
    // 정적(static) 메소드
    public static getSName(): string {
        return '정적 메소드';
    }
}
// 정적 필드 접근
Animal.sName;
Animal.getSName();

// 인스턴스 필드 접근
const animal: Animal = new Animal();
animal.name;
animal.getName();

// ----------------------
// 생성자 메소드 : 객체가 생성될 때 자동으로 호출되는 특수한 메소드
// ----------------------
class Whale {
    // public name: string;
    // 생성자 메소드
    // 객체의 인스턴스 생성시 실행되어야 하는 작업들 위해서 사용
    // constructor(name: string) {
    //     this.name = name;
    // }

    // 생성자 단축 속성(Parameter properties)
    // 생성자 파라미터 앞에 접근 제한자를 붙이면 필드 선언과 초기화를 한 번에 가능
    constructor(public name: string) {
        // --------------
        // this 참조 변수
        // --------------
        this.name = name
    }
}
const whale1: Whale = new Whale('라분');
const whale2: Whale = new Whale('고래2');

// -------------------------------
// 접근 제어 지시자
// -------------------------------
class Cat {
    // public : class 내외부 어디에서나 접근 가능(기본값) 
    // private : class 내부에서만 접근 가능
    // protected(js에서는 없음) : class 내부 또는 자식클래스에만 접근이 가능
    num1: number = 1; // 생략해서 적으면 기본 public
    public num2: number = 2;
    private num3: number = 3;
    protected num4: number = 4;
}
const cat: Cat = new Cat();
cat.num1;
cat.num2;
// cat.num3; // error
// cat.num4; // error

class CatChild extends Cat {
    test(): void {
        this.num4;
    }
}