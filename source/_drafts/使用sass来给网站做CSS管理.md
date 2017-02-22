.header {
  color: green;
  &__abc {
    background: red;
  }
}

@mixin abc($cls) {
  .#{$cls} {
    color: green;
    &__test {
      background: red;
    }
  }
}

@include abc(abcd);
