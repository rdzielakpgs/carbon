Feature: Button component
  I want to change Button label, theme, size and subtext

  @positive
  Scenario Outline: Change Button component label
    Given I open Button component page
    When I set children to "<label>"
    Then Button label on preview is "<label>"
    Examples:
      | label                    |
      | First Label Test         |
      | Second label test        |
      | 1!@#$%^*()_+-=~[];:.,?{} |
      | 汉字                       |
      | <>                       |

  @positive
  Scenario Outline: Change Button subtext
    Given I open Button component page
    When I set component size to "large"
      And I set component subtext to "<subtext>"
    Then Button subtext on preview is "<subtext>"
    Examples:
      | subtext                  |
      | example subtext          |
      | 1!@#$%^*()_+-=~[];:.,?{} |
      | 汉字                       |
      | <>                       |

  @negative
  Scenario: I set space character to Button subtext
    Given I open Button component page
    When I set component size to "large"
      # I use space character below
      And I set component subtext to " "
    Then Button subtext on preview is " "

  @positive
  Scenario: I set component size to large but I leave Button subtext empty
    Given I open Button component page
    When I set component size to "large"
    # And I leave Button subtext empty
    Then Button subtext on preview is not visible

  @positive
  Scenario Outline: Change Button 'as' property
    Given I open Button component page
    When I set as property to "<as>"
    Then Button as property on preview is "<as>"
    Examples:
      | as        |
      | primary   |
      | secondary |

  @positive
  Scenario: Disable Button
    Given I open Button component page
    When I disable Button
    Then Button is disabled

  @positive
  Scenario: Disable and enable Button
    Given I open Button component page
    When I disable Button
      And I enable Button
    Then Button is enabled

  @positive
  Scenario Outline: Set Button size to small, medium and large
    Given I open Button component page
    When I set component size to "<size>"
    Then Button size property on preview is "<size>"
    Examples:
      | size   |
      | small  |
      | medium |
      | large  |

  @positive
  Scenario Outline: Set theme to Button
    Given I open Button component page
    When I set Button theme property to "<theme>"
    Then Button theme property on preview is "<theme>"
    Examples:
      | theme        |
      | blue         |
      | grey         |
      | magenta      |
      | magenta-dull |
      | red          |
      | white        |
