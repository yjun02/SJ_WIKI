# 🌐 Chapter 6. Link Layer & LANs

## 1. 개요 (Introduction)
### 1.1 링크 계층의 역할
* **노드-투-노드(Node-to-Node):** 물리적으로 직접 연결된 인접 노드 간의 믿을 수 있는 데이터 전송을 담당.
* **주요 서비스:**
    * **Framing:** 데이터그램을 프레임으로 캡슐화.
    * **Link Access:** MAC 주소를 사용해 매체 접속 제어.
    * **Error Detection:** 비트 에러 탐지 및 폐기 (또는 정정).

---

## 2. 에러 탐지 및 정정 (Error Detection & Correction)
### 2.1 패리티(Parity) 비트
* **단일 패리티:** 1의 개수를 짝수(Even) 혹은 홀수(Odd)로 맞추는 단순한 방식. 1비트 오류만 검출 가능.
* **2차원 패리티:** 행과 열에 패리티를 두어 비트 에러 탐지 및 **정정**까지 가능.

### 2.2 CRC (Cyclic Redundancy Check)
* **원리:** 데이터(D)를 생성 다항식(G)으로 나누었을 때 나머지가 0이 되도록 비트를 추가하여 전송.
* 강력한 에러 검출 능력으로 Ethernet, WiFi 등에서 널리 사용됨.

```component
CRCCalculator
```

---

## 3. 다중 접속 프로토콜 (Multiple Access Protocols)
단일 공유 링크(Broadcast channel)를 여러 노드가 사용할 때 충돌을 방지하거나 조율하는 규약.

### 3.1 Random Access
* 노드들이 언제든지 전송을 시도할 수 있음 -> **충돌(Collision)** 발생 가능.
* **CSMA/CD (Carrier Sense Multiple Access with Collision Detection):**
    * **Sense:** 전송 전 회선이 비었는지 확인.
    * **Collision Detection:** 전송 중 충돌이 감지되면 즉시 데이터 전송을 멈춤.
    * **Binary Exponential Backoff:** 재전송 대기 시간을 지수적으로 늘려감 ($2^n$).
* **CSMA/CA:** 무선(WiFi)에서는 충돌 감지가 어려워 **충돌 회피(Avoidance)**를 사용.

### 3.2 Taking Turns
* **Polling:** 마스터 노드가 슬레이브 노드에게 전송 권한을 순차적으로 부여.
* **Token Passing:** 토큰을 가진 노드만 전송 가능.

---

## 4. Ethernet & Switches
### 4.1 MAC Address
* **48비트** 고정 주소 (예: `1A:2B:3C:4D:5E:6F`).
* **ARP (Address Resolution Protocol):** IP 주소를 MAC 주소로 변환.

### 4.2 Switch
* **Link-layer Device:** 물리 계층(L1)이 아닌 링크 계층(L2)에서 동작.
* **Self-learning:** 프레임이 들어올 때 송신자 MAC과 포트를 테이블에 기록.
* **Filtering & Forwarding:** 목적지 MAC이 테이블에 있으면 해당 포트로만 전송(유니캐스트), 없으면 플러딩(Flooding).

---

## 5. 종합 시뮬레이션 (Putting It All Together)
### A Day in the Life of a Web Request
사용자가 `www.google.com`을 입력했을 때, 패킷이 내 노트북에서 출발하여 구글 서버까지 도달하는 과정. DHCP, UDP, IP, Ethernet, ARP, DNS, TCP, HTTP 등 모든 계층의 프로토콜이 협력함.

```component
DayInLifeAnimation
```
