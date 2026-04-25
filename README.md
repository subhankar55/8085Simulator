# 8085 Microprocessor Simulator

A desktop-based educational simulator for the **Intel 8085 Microprocessor** that allows users to write, assemble, debug and execute 8085 Assembly Language Programs without requiring physical hardware.

This project provides an integrated environment consisting of:

- Assembly Code Editor
- Opcode Generator / Assembler
- Register Monitoring
- Flag Status Viewer
- Memory Viewer
- I/O Port Interface
- Step-by-Step Debugger
- Full Program Execution Engine

The simulator is designed to help students, educators and electronics enthusiasts understand the internal working of the 8085 microprocessor interactively.

---

# Table of Contents

1. Introduction to 8085 Microprocessor
2. Why this Simulator?
3. Intel 8085 Architecture Overview
4. 8085 Instruction Set Architecture (ISA)
5. Project Features
6. Technologies Used
7. Internal Working of the Simulator
8. Project Structure
9. How to Run the Project
10. Sample Program
11. Future Improvements
12. License

---

# 1. Introduction to Intel 8085 Microprocessor

The **Intel 8085** is an **8-bit microprocessor** introduced by Intel.  
It was one of the most widely used processors in academic laboratories for learning:

- Assembly Language Programming
- Memory Interfacing
- Register Transfer Operations
- Stack Manipulation
- Interrupt Handling
- Timing Diagrams
- I/O Port Communication

### Key Characteristics

| Feature | Description |
|---------|-------------|
| Word Length | 8-bit |
| Address Bus | 16-bit |
| Data Bus | 8-bit |
| Maximum Memory Access | 64 KB |
| Clock Frequency | ~3 MHz |
| Registers | A, B, C, D, E, H, L |
| Special Registers | SP, PC, PSW |
| Flags | S, Z, AC, P, CY |

The processor follows the **Fetch → Decode → Execute** cycle for every instruction.

---

# 2. Why this Simulator?

Working with a real 8085 trainer kit requires:

- physical hardware setup,
- memory chips,
- keypad entry,
- external interfacing devices,
- manual reset/debugging.

This simulator removes those constraints and offers:

✅ fast coding  
✅ instant opcode generation  
✅ register visualization  
✅ flag monitoring  
✅ memory inspection  
✅ step debugging  
✅ interrupt simulation

thus making learning more interactive and practical.

---

# 3. Intel 8085 Architecture Overview

The 8085 consists of the following major components:

## Registers

- **Accumulator (A)** : Main arithmetic register
- **B, C, D, E, H, L** : General purpose registers
- **Program Counter (PC)** : Holds next instruction address
- **Stack Pointer (SP)** : Points to top of stack
- **PSW (Program Status Word)** : Accumulator + Flag Register

## Flags

- Sign Flag (S)
- Zero Flag (Z)
- Auxiliary Carry (AC)
- Parity Flag (P)
- Carry Flag (CY)

## Other Internal Units

- Arithmetic Logic Unit (ALU)
- Instruction Decoder
- Timing & Control Unit
- Interrupt Control
- Serial I/O Control
- Address/Data Buffers

---

# 4. 8085 Instruction Set Architecture (ISA)

The simulator supports the instruction classes of the Intel 8085 ISA.

## Data Transfer Instructions

`MOV`, `MVI`, `LDA`, `STA`, `LHLD`, `SHLD`, `LXI`

## Arithmetic Instructions

`ADD`, `ADI`, `SUB`, `SUI`, `INR`, `DCR`, `DAD`

## Logical Instructions

`ANA`, `ORA`, `XRA`, `CMP`, `CMA`, `CMC`

## Branching Instructions

`JMP`, `JZ`, `JNZ`, `JC`, `JNC`, `CALL`, `RET`

## Stack Instructions

`PUSH`, `POP`, `XTHL`, `SPHL`

## Machine Control Instructions

`NOP`, `HLT`, `SIM`, `RIM`, `EI`, `DI`

Each instruction is translated into corresponding hexadecimal opcodes before simulation.

---

# 5. Project Features

- Syntax highlighted Assembly Editor
- Mnemonic to Opcode conversion
- Label support (`START:` etc.)
- Direct Register Monitoring
- A/PSW visual output
- Memory read/write panel
- I/O mapped port simulation
- Breakpoint support
- Forward and backward debugging
- Automatic execution engine
- Interrupt triggering
- Trainer kit style educational visualization

---

# 6. Technologies Used

This simulator ecosystem is built using a **Java Desktop Application architecture**, similar to the original open-source 8085 simulator lineage. The original upstream project distributes executable `.jar` builds and NetBeans project files, indicating a Java Swing + Java runtime based implementation. :contentReference[oaicite:2]{index=2}

## Core Technologies

| Technology | Purpose |
|------------|---------|
| Java | Core application logic |
| Java Swing / AWT | Desktop GUI rendering |
| NetBeans Build System | Project management |
| Intel 8085 Opcode Mapping | Instruction decoding |
| Custom Assembler Engine | Mnemonic parsing |
| Register State Engine | CPU state simulation |
| Memory Emulation Module | 64KB memory modeling |
| Debugger Engine | Step execution |

---

# 7. Internal Working of the Simulator

The simulator internally mimics a software CPU.

### Module Pipeline

```text
Assembly Code
   ↓
Lexical Parsing
   ↓
Mnemonic Validation
   ↓
Opcode Generation
   ↓
Memory Loading
   ↓
Fetch-Decode-Execute Engine
   ↓
Register / Flag Update
   ↓
GUI Refresh
```

### Main Functional Components

- **Assembler Module** → converts `.asm` source into machine code
- **Execution Engine** → simulates CPU cycle
- **Memory Manager** → handles RAM locations
- **Register Bank** → stores A, B, C, D, E, H, L, SP, PC
- **Flag Controller** → updates PSW after ALU operations
- **Debugger** → stepwise execution

---

# 8. Project Structure

```bash
8085Simulator/
│── src/                  # Java source files
│── dist/                 # Executable JAR build
│── build/                # Build artifacts
│── nbproject/            # NetBeans configuration
│── 8085 example code/    # Sample assembly programs
│── README.md
```

---

# 9. How to Run the Project

## Option 1 — Run Prebuilt JAR

Make sure Java is installed.

```bash
java -jar dist/8085Compiler.jar
```

or

```bash
java -jar 8085Compiler_v1.jar
```

The original simulator distribution also specifies Java Runtime as a requirement for execution. :contentReference[oaicite:3]{index=3}

---

## Option 2 — Run from Source (NetBeans / Java)

Compile all Java files inside `src/` and run the main launcher class.

Typical workflow:

```bash
git clone https://github.com/subhankar55/8085Simulator.git
cd 8085Simulator
javac -d build src/**/*.java
java -cp build Main
```

> Depending on package naming, the main class may differ.

---

# 10. Sample Assembly Program

```asm
JMP START

START:  MVI A,05H
        MOV B,A
        MVI A,03H
        ADD B
        HLT
```

### Output

Accumulator = `08H`

---


