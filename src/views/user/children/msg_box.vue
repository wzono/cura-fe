<template>
  <div class="message-box">
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon large slot="left">
        <mu-icon value="perm_contact_calendar"></mu-icon>
      </mu-button>
      <mu-flex class="title" slot="default" justify-content="center">
        <span>消息</span>
      </mu-flex>
      <mu-flex class="menu-wrapper" slot="right">
        <mu-menu>
          <mu-button icon large>
            <mu-icon value="add"></mu-icon>
          </mu-button>
          <mu-list slot="content">
            <mu-list-item button>
              <mu-list-item-content>
                <mu-list-item-title>Menu Item 1</mu-list-item-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-list-item button>
              <mu-list-item-content>
                <mu-list-item-title>Menu Item 2</mu-list-item-title>
              </mu-list-item-content>
            </mu-list-item>
          </mu-list>
        </mu-menu>
      </mu-flex>
    </mu-appbar>
    <div class="content-wrapper"></div>
  </div>
</template>
