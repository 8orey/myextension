## Author

Губанов Дмитрий Владимирович, М3100

## Extension Name

myExtension

## Features

Это расширение добавляет два сочетания клавиш для рефакторинга и прототипирования кода на С++.

1. wrapSelectionInFunction - заменяет выделенный блок кода на лямбда выражение с выделенным блоком внутри. Ctrl + Shift + '
2. wrapSelectionInConstant - заменяет выделенный блок кода на constexpr выражение с выделенным кодом внутри. Ctrl + Shift + ;

## Usage Examples
### wrapSelectionInFunction
Мы хотели бы быстро объявить простую лямбду дублирующую вывод в логгер ещё и в std::cerr. 
```C++
#include <iostream>
#include "logger.h"

void procedure(logger const& myLogger, bool useCerr) {
    ...

    // До вызова wrapSelectionInFunction
    logger.log(message);
    if (useCerr) {
        std::cerr << message << std::endl;
    }

    // После 
    const auto my_lambda = [&]() {
        logger.log(message);
        if (useCerr) {
            std::cerr << message << std::endl;
        }
    }

    ...
}
```
### wrapSelectionInConstant
Во время быстрого прототипирования мы часто хотим быстро объявить массив константного размера и для этого необходима константная длина.
``` C++ 
#include <cstdint>
#include "FileType.h"

char* read_from_file(const char* ptr) {
    FileType file = File::fromPath(ptr);
    
    // До замены
    65536
    char buffer[N];

    // После 
    constexpr auto kMyConstant = 65536;
    char buffer[N];

    ... 

    file.read(buffer, byte_count);
    return buffer;
}

```
## Installing Guide

Вы можете найти это расширение самостоятельно по его названию в официальном магазине для VS Code 

## Release Notes

7a1e911 Rewrite README.md and delete generated files

99db983 Small refactoring, delete two register calls

fb16129 Initial commit, add two function and shortcuts for them

---
