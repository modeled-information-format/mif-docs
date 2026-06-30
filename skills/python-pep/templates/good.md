---
id: pep-9999-math-clamp
type: semantic
created: 2026-06-29T10:00:00Z
namespace: pep/standards-track
title: Add math.clamp() to the Standard Library
tags:
  - pep
  - python
  - standards-track
  - math
  - stdlib
---

# PEP 9999 – Add math.clamp() to the Standard Library

```text
PEP: 9999
Title: Add math.clamp() to the Standard Library
Author: Pat Developer <pat@example.com>
Status: Draft
Type: Standards Track
Created: 29-Jun-2026
Python-Version: 3.15
```

## Abstract

This PEP proposes adding a `clamp()` function to the `math` module. Given a
value and an inclusive lower and upper bound, `math.clamp(x, lo, hi)` returns
`x` constrained to the closed interval `[lo, hi]`. The pattern
`max(lo, min(x, hi))` is written constantly across scientific, graphics, and
UI code; it is easy to get subtly wrong, and its intent is not obvious at a
glance. A named, well-specified function makes the operation explicit, correct,
and discoverable.

## Motivation

Clamping a value to a range is one of the most frequently re-implemented one-line
helpers in the ecosystem. A survey of the standard library, NumPy, the `colorsys`
module, and popular third-party packages shows the same `max(lo, min(x, hi))`
idiom repeated with no shared definition.

Three problems follow from the absence of a canonical function:

- **Argument-order bugs.** `min(lo, max(x, hi))` (swapped) silently returns the
  wrong value and passes most tests.
- **Inverted-bound surprises.** When `lo > hi`, the nested `min`/`max` form
  produces a result that depends on evaluation order rather than raising.
- **Readability.** `clamp(x, 0.0, 1.0)` states intent; `max(0.0, min(x, 1.0))`
  forces the reader to decode it.

Because clamping is numeric and universal, the `math` module is its natural home.

## Rationale

Placing `clamp` in `math` (rather than `builtins`) keeps the global namespace
small while putting the function where numeric helpers already live, alongside
`math.copysign`, `math.fsum`, and `math.isclose`.

The signature `clamp(x, lo, hi)` mirrors the mental model "clamp x into
[lo, hi]" and matches the ordering used by Rust's `f64::clamp`, C++'s
`std::clamp`, and NumPy's `clip`. Keyword arguments `min` and `max` were
rejected because they shadow the builtins (see Rejected Ideas).

`clamp` raises `ValueError` when `lo > hi`, treating an inverted interval as a
programming error rather than returning an implementation-defined value. This is
the same choice C++17's `std::clamp` documents as undefined and Rust's `clamp`
turns into a panic; raising is the Pythonic equivalent.

## Specification

A new function is added to the `math` module:

```python
def clamp(x, lo, hi, /):
    """Return x constrained to the closed interval [lo, hi].

    Raises ValueError if lo > hi. Propagates NaN: if x is NaN, NaN is
    returned; if a bound is NaN, ValueError is raised.
    """
```

Normative behavior:

- All three parameters are positional-only.
- If `lo > hi`, raise `ValueError`.
- If either `lo` or `hi` is NaN, raise `ValueError` (the interval is undefined).
- If `x` is NaN, return NaN (NaN propagation, consistent with IEEE 754).
- Otherwise return `lo` if `x < lo`, `hi` if `x > hi`, else `x`.
- The return value preserves the type of the selected argument; mixed
  `int`/`float` inputs follow ordinary comparison and return semantics.

The function is implemented in C in the `math` module, with an equivalent pure
Python fallback for alternative implementations.

## Backwards Compatibility

Adding a new function to `math` is backwards compatible: no existing name,
signature, or behavior changes. The only observable risk is code that does
`from math import *` and also defines a module-level `clamp`; in that case the
existing local binding shadows the import exactly as it does today for any other
`math` name, so no working program changes meaning. No deprecation is required.

## Security Implications

None. `clamp` performs only numeric comparison and selection on its arguments,
introduces no parsing, no I/O, no eval, and no new attack surface.

## How to Teach This

`clamp` is taught alongside `min` and `max` as "the bounded version of both at
once". Introductory material presents the canonical example —
`brightness = math.clamp(value, 0.0, 1.0)` — and contrasts it with the
error-prone `max(0.0, min(value, 1.0))` form it replaces. Reference documentation
states the three rules learners must remember: inverted bounds raise, `x` NaN
propagates, and bound NaN raises. The What's New entry links the function from
the `math` module page and from the `min`/`max` builtin docs.

## Reference Implementation

A working implementation, tests, and documentation are available in the tracking
pull request: <https://github.com/python/cpython/pull/99999>. The pure Python
reference follows directly from the Specification:

```python
def clamp(x, lo, hi, /):
    if lo > hi:
        raise ValueError("clamp: lower bound exceeds upper bound")
    if x != x:          # x is NaN
        return x
    if lo != lo or hi != hi:
        raise ValueError("clamp: bound is NaN")
    if x < lo:
        return lo
    if x > hi:
        return hi
    return x
```

## Rejected Ideas

- **Add `clamp` as a builtin.** Rejected: clamping is a numeric operation, not a
  language primitive, and the core team resists growing `builtins`.
- **Keyword arguments `clamp(x, min=..., max=...)`.** Rejected: `min` and `max`
  shadow the builtins and read poorly at call sites.
- **Silently swap inverted bounds.** Rejected: hiding a `lo > hi` mistake makes
  bugs harder to find; raising surfaces them immediately.
- **A three-argument form of the `min`/`max` builtins.** Rejected: overloading
  `min`/`max` with range semantics is confusing and breaks their variadic
  contract.

## Open Issues

- Should `clamp` be added to the `statistics` or `numbers` documentation as a
  cross-reference, or only to `math`?
- Whether to also expose a vectorized form is explicitly out of scope; that
  belongs to NumPy's `clip`, not the standard library.
