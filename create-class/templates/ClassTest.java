package <%- classPackage %>;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Before;

/**
 * <%- className %> unit testing.
 */
public class <%- className %>Test {

  private <%- className %> <%- classVariableName %>;

  @Before
  public void setUp() {
    <%- classVariableName %> = new <%- className %>();
  }

}
