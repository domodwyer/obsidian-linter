import ParagraphBlankLines from '../rules/paragraph-blank-lines';
import dedent from 'ts-dedent';
import {ruleTest} from './common';

ruleTest({
  RuleBuilderClass: ParagraphBlankLines,
  testCases: [
    {
      testName: 'Ignores codeblocks',
      before: dedent`
        ---
        front matter
        front matter
        ---

        Hello
        World
        \`\`\`python
        # comment not header
        a = b
        c = d
        \`\`\`
      `,
      after: dedent`
        ---
        front matter
        front matter
        ---

        Hello

        World

        \`\`\`python
        # comment not header
        a = b
        c = d
        \`\`\`
      `,
    },
    {
      testName: 'Handles lists',
      before: dedent`
        Hello
        World
        - 1
        \t- 2
            - 3
      `,
      after: dedent`
        Hello

        World

        - 1
        \t- 2
            - 3
      `,
    },
    {
      // accounts for https://github.com/platers/obsidian-linter/issues/250
      testName: 'Paragraphs that start with numbers are spaced out',
      before: dedent`
        # Hello world


        123 foo
        123 bar
      `,
      after: dedent`
        # Hello world

        123 foo

        123 bar
      `,
    },
    {
      // accounts for https://github.com/platers/obsidian-linter/issues/250
      testName: 'Paragraphs that start with foreign characters are spaced out',
      before: dedent`
        # Hello world


        测试 foo
        测试 bar
      `,
      after: dedent`
        # Hello world

        测试 foo

        测试 bar
      `,
    },
    {
      // accounts for https://github.com/platers/obsidian-linter/issues/250
      testName: 'Paragraphs that start with whitespace characters are spaced out',
      before: dedent`
        # Hello world

        foo
        bar
      `,
      after: dedent`
        # Hello world

        foo

        bar
      `,
    },
    {
      testName: 'Make sure blockquotes are not affected',
      before: dedent`
        # Hello world
    
        > blockquote
        > blockquote line 2
      `,
      after: dedent`
        # Hello world
    
        > blockquote
        > blockquote line 2
      `,
    },
    {
      testName: 'Make sure lists are not affected',
      before: dedent`
        # Hello world

        > blockquote
        > blockquote line 2
      `,
      after: dedent`
        # Hello world

        > blockquote
        > blockquote line 2
      `,
    },
    {
      testName: 'Make sure lines ending in a line break are not affected',
      before: dedent`
        # Hello world


        paragraph line 1 <br>
        paragraph line 2  
        paragraph line 3 <br/>
        paragraph final line


      `,
      after: dedent`
        # Hello world

        paragraph line 1 <br>
        paragraph line 2  
        paragraph line 3 <br/>
        paragraph final line

      `,
    },
    {
      testName: 'Make sure obsidian multiline comments are not affected',
      before: dedent`
        Here is some inline comments: %%You can't see this text%% (Can't see it)

        Here is a block comment:
        %%
        It can span
        multiple lines
        %%
      `,
      after: dedent`
        Here is some inline comments: %%You can't see this text%% (Can't see it)

        Here is a block comment:

        %%
        It can span
        multiple lines
        %%
      `,
    },
    {
      testName: 'Preserves trailing line break',
      before: dedent`
        Line followed by line break

      `,
      after: dedent`
        Line followed by line break

      `,
    },
    {
      testName: 'Doesn\'t add trailing line break',
      before: dedent`
        Line not followed by line break
      `,
      after: dedent`
        Line not followed by line break
      `,
    },
  ],
});
