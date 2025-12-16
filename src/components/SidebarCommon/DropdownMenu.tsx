import { Menu } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";

<Menu position="bottom-end" shadow="md" width={200}>
  <Menu.Target>
    <button>
      <IconDotsVertical size={20} />
    </button>
  </Menu.Target>

  <Menu.Dropdown>
    <Menu.Item onClick={handleEditBoard}>
      Edit Board
    </Menu.Item>
    <hr />
    <Menu.Item color="red" onClick={handleDeleteBoard}>
      Delete Board
    </Menu.Item>
  </Menu.Dropdown>
</Menu>

