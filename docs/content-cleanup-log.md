# PrepLoom Content Cleanup Log

This log records student-facing content removals and consolidations. Source material is retained when it remains useful for authoring or for keeping a subject independently understandable.

## 2026-08-14 — Technical-note duplication cleanup

### Explicitly preserved

- `content/subjects/operating-systems-base.ts` was not changed. Its legacy OS notes remain available as requested.

### Operating Systems

- Removed the standalone **Deadlock Handling** topic because prevention, avoidance, detection, and recovery were already covered by dedicated topics.
- Merged its unique **Ostrich Approach**, mixed-strategy guidance, practical examples, and strategy diagram into **Deadlock Fundamentals**.
- Deleted `content/subjects/operating-systems/deadlock-handling.ts` and removed its course import.

### Object-Oriented Programming

- Shortened **Polymorphism** to a conceptual introduction. Detailed overloading, overriding, reference-type, and runtime-dispatch explanations remain in their dedicated topics.
- Removed the method-signature preview from **Fields, Methods, and Object Interaction** because the overloading topic owns that rule.
- Removed implementation-mechanism repetition from **Abstraction** because abstract classes and interfaces have a dedicated topic.
- Removed the repeated **Composition Over Inheritance** section from **IS-A and HAS-A**; the design trade-off remains in **Coupling, Cohesion, and Composition**.

### Machine Learning and Deep Learning

- Kept ML as the full foundation and shortened repeated DL prerequisite explanations.
- In DL, removed repeated long-form coverage of dataset split roles, generic underfitting/overfitting definitions, basic L1/L2 definitions, input standardization, basic MSE/BCE definitions, and the generic gradient-descent update rule.
- Retained short revision summaries plus DL-specific material: leakage in neural datasets, learning-curve diagnosis, weight decay, BatchNorm, categorical cross-entropy, logits, mini-batch training, schedules, and loss surfaces.

### Computer Networks

- Removed detailed Ethernet switch learning/forwarding from **Network Topologies and Devices**.
- Kept only the high-level hub/switch/router comparison there; detailed MAC learning and forwarding remains in **MAC Addressing and LAN Switching**.

### Computer Architecture

- Removed the repeated virtual-memory/address-translation section from **Memory Hierarchy and Cache** and renamed it **Memory Hierarchy and Cache**.
- Retained cache locality, mapping, replacement, write policies, and AMAT. Paging, TLB, and page-fault details remain in Operating Systems.
- Removed the repeated polling-versus-interrupts comparison table from Architecture. Architecture retains the hardware interrupt sequence; OS retains the operating-system comparison and DMA treatment.

### DBMS

- Removed the repeated candidate-key definition table from the revision view of **Attribute Closure and Candidate Keys**.
- Retained key definitions in **Database Keys** and closure/minimality procedures in the normalization module.

### Implementation note

- Added `content/subjects/curation.ts` to omit repeated sections from published topics without destroying useful authoring material.
