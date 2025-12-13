# 🌐 Chapter 5. Network Layer: Control Plane

## 1. 개요 (Introduction)
### 1.1 제어 평면의 두 가지 접근 방식
* **Per-router Control (전통적 방식):** 각 라우터마다 라우팅 알고리즘이 개별적으로 실행됨. 서로 정보를 교환하며 포워딩 테이블을 작성.
* **Logically Centralized Control (SDN 방식):** 중앙 컨트롤러가 경로를 계산하여 각 라우터의 CA(Control Agent)에 포워딩 정보를 직접 하달.

---

## 2. 라우팅 알고리즘 (Routing Algorithms)
목적은 송신지부터 목적지까지 **최소 비용(Least Cost)** 경로를 찾는 것.

### 2.1 Link State (LS) 알고리즘
* **특징:** 모든 라우터가 네트워크 전체의 토폴로지와 링크 비용 정보를 알고 있음. (Global knowledge)
* **알고리즘:** **Dijkstra's Algorithm**.
* **작동:** 한 노드에서 다른 모든 노드까지의 최단 경로 계산.
* **메시지:** "Link State Broadcast"를 통해 전체 네트워크에 정보를 뿌림.
* **복잡도:** $O(n^2)$ 또는 $O(n \log n)$.

![Dijkstra Algorithm Diagram](https://example.com/dijkstra.png)



### 2.2 Distance Vector (DV) 알고리즘
* **특징:** 인접한 이웃과만 정보를 교환함. (Iterative, Distributed)
* **알고리즘:** **Bellman-Ford Equation**.
    * $d_x(y) = \min_v \{ c(x,v) + d_v(y) \}$
* **문제점:** **Count-to-infinity** 문제. 링크 비용이 급격히 증가할 때 수렴 속도가 매우 느려짐.
* **해결책:** Poisoned Reverse (자신이 특정 노드로 가는 경로가 이웃을 거치는 것이라면, 그 이웃에게는 비용을 $\infty$로 알려줌).



---

## 3. Autonomous Systems (AS) 간 라우팅
인터넷은 너무 커서 모든 라우터를 평면적으로 관리할 수 없음. 따라서 **AS(Autonomous Systems)** 단위로 계층화함.

### 3.1 Intra-AS Routing (내부 라우팅)
* 동일한 AS 내부에서 실행되는 프로토콜.
* **OSPF (Open Shortest Path First):**
    * LS 알고리즘(Dijkstra) 기반.
    * 계층 구조(Area) 지원 가능.
    * 보안 기능을 위해 인증(Authentication) 사용.

### 3.2 Inter-AS Routing (외부 라우팅)
* AS와 AS 사이를 연결하는 프로토콜.
* **BGP (Border Gateway Protocol):** 인터넷을 하나로 묶는 '접착제' 역할.
    * **eBGP:** 인접한 AS 간에 도달 가능성(Reachability) 정보를 교환.
    * **iBGP:** AS 내부 라우터들에게 외부 정보를 전파.
    * **Policy-based Routing:** 비용보다는 비즈니스 관계나 정책에 따라 경로를 결정.



---

## 4. SDN 제어 평면 (SDN Control Plane)
* **특징:** 제어 로직을 하드웨어와 분리하여 소프트웨어로 구현.
* **구성 요소:**
    1. **Communication Layer:** OpenFlow 등의 프로토콜로 스위치와 통신.
    2. **Network-wide State Management:** 네트워크 토폴로지, 플로우 통계 관리.
    3. **Application Layer:** 라우팅, 방화벽, 로드 밸런싱 앱 실행.



---

## 5. ICMP (Internet Control Message Protocol)
* **목적:** 호스트와 라우터 간의 네트워크 수준 에러 보고 및 정보 교환.
* **구조:** IP 데이터그램의 페이로드에 실려 전송됨.
* **대표 사례:**
    * **Ping:** Echo request/reply를 통해 활성화 확인.
    * **Traceroute:** TTL 값을 1씩 늘려가며 경로상의 라우터 IP를 확인.

---

## 6. 네트워크 관리 (Network Management)
* **SNMP (Simple Network Management Protocol):** 관리 서버가 에이전트의 MIB(Management Information Base) 데이터를 조회하거나 설정.
* **NETCONF/YANG:** 더 복잡하고 현대적인 구성을 위해 데이터 모델링 언어(YANG)를 사용하는 프로토콜.