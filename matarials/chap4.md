# 🌐 Chapter 4. Network Layer: Data Plane

## 1. 개요 (Overview)
### 1.1 데이터 평면 vs 제어 평면
* **Data Plane (데이터 평면):** 로컬, 포트별 기능. 입력 포트에 도착한 데이터그램을 적절한 출력 포트로 이동시키는 **Forwarding(포워딩)**을 담당.
* **Control Plane (제어 평면):** 네트워크 전체의 로직. 데이터그램이 출발지부터 목적지까지 갈 경로를 결정하는 **Routing(라우팅)**을 담당.
    * **전통적 방식:** 각 라우터 내부의 라우팅 알고리즘이 상호작용.
    * **SDN 방식:** 중앙 집중형 컨트롤러가 각 라우터의 Flow Table을 원격으로 제어.

### 1.2 서비스 모델
* 인터넷(IP)은 **"Best-effort"** 서비스 모델을 따름. 대역폭 보장, 손실 없음, 순서 보장, 타이밍 보장 등을 제공하지 않음.

---

## 2. 라우터 내부 구조 (What’s Inside a Router)
### 2.1 입력 포트 (Input Port)
* **물리 계층:** 비트 단위 수신.
* **링크 계층:** 프레임 해제 (Ethernet 등).
* **분산 스위칭:** 목적지 IP 주소를 보고 **Longest Prefix Matching (LPM)**을 통해 출력 포트 결정.

### 2.2 스위칭 패브릭 (Switching Fabric)
* **Memory:** CPU가 직접 복사 (속도 느림).
* **Bus:** 공유 버스 이용 (충돌 가능).
* **Crossbar:** 여러 경로를 동시에 연결 (가장 빠름).

### 2.3 출력 포트 (Output Port)
* **버퍼링:** 스위칭 속도가 출력 속도보다 빠를 때 필요.
* **Scheduling:** 어떤 패킷을 먼저 보낼지 결정.
    * **FIFO:** 도착 순서대로.
    * **Priority:** 높은 우선순위 먼저.
    * **Round Robin (RR):** 클래스별로 돌아가며 전송.
    * **Weighted Fair Queuing (WFQ):** 클래스별 가중치 부여 (가장 일반화된 형태).



---

## 3. IP: Internet Protocol
### 3.1 IP 데이터그램 형식 (Datagram Format)
* **헤더 크기:** 보통 **20 bytes**. (TCP 20 + IP 20 = 40 bytes의 기본 오버헤드)
* **주요 필드:** TTL(Hop 제한), Protocol(상위 계층 식별), Type of Service, Length 등.

### 3.2 IP Fragmentation (단편화)
* **이유:** 링크마다 보낼 수 있는 최대 크기인 **MTU(Maximum Transfer Unit)**가 다르기 때문.
* **핵심 원리:**
    1.  헤더(20B)를 제외한 **순수 데이터(Payload)**를 쪼갬.
    2.  각 조각은 **새로운 20B 헤더**를 가짐.
    3.  **Offset:** 8바이트 단위로 측정 (데이터 시작 위치 / 8).
    4.  **MF (More Fragments):** 마지막 조각만 0, 나머지는 1.
* *예: 4000B 패킷(데이터 3980B)을 MTU 1500B로 쪼갤 때, 데이터는 1480B씩 잘림.*

```component
FragmentationCalculator
```

### 3.3 IP Addressing & CIDR
* **IP 주소:** 32비트 식별자. 인터페이스(호스트/라우터와 물리적 링크의 경계)당 하나.
* **Subnet:** 라우터를 거치지 않고 물리적으로 연결된 인터페이스들의 집합.
* **CIDR (Classless Inter-Domain Routing):** `a.b.c.d/x` 형태. `x`는 네트워크 부분의 비트 수(Prefix).

### 3.4 DHCP (Dynamic Host Configuration Protocol)
* **목적:** 호스트가 서버로부터 IP 주소를 동적으로 할당받음.
* **4단계:** **Discover $\rightarrow$ Offer $\rightarrow$ Request $\rightarrow$ ACK** (DORA).

### 3.5 계층적 주소 할당 (Hierarchical Addressing)
* ISP가 큰 주소 블록을 할당받아 하위 조직에 쪼개어 배분.
* **Route Aggregation:** 여러 개의 하위 주소를 하나의 큰 프리픽스로 요약하여 라우팅 테이블 크기를 줄임.



---

## 4. NAT & IPv6
### 4.1 NAT (Network Address Translation)
* **사설 IP:** 외부 인터넷에서는 보이지 않음.
* **NAT Table:** `(사설 IP, 포트)`와 `(공인 IP, 신규 포트)`를 매핑.
* **장점:** 공인 IP 절약, 보안성 강화, 내부 주소 변경 없이 ISP 변경 가능.

### 4.2 IPv6
* **주소 길이:** **128비트**.
* **변화:** 고정 40B 헤더, Fragmentation 금지(체크섬 제거로 처리 속도 향상).
* **Tunneling (터널링):** IPv4 네트워크를 통과할 때 IPv6 패킷을 IPv4 데이터 영역에 담아(캡슐화) 전송.

---

## 5. Generalized Forwarding (SDN/OpenFlow)
### 5.1 Match + Action
* 기존의 목적지 기반 포워딩에서 벗어나, 헤더의 다양한 필드(MAC, IP, Port 등)를 조합하여 매칭.
* **Action:** Forward, Drop, Modify(NAT 역할), Send to Controller.

### 5.2 Flow Table
* SDN 스위치는 Flow Table을 통해 패킷을 처리.
* 이 방식을 통해 하드웨어 변경 없이 소프트웨어적으로 **라우터, 스위치, 방화벽** 기능을 모두 수행 가능.