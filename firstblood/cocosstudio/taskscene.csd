<GameProjectFile>
  <PropertyGroup Type="Scene" Name="taskscene" ID="2fef0064-a01a-4dbb-b64d-ecb4f8d77ad3" Version="2.3.2.3" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="0" Speed="1.0000" />
      <ObjectData Name="Scene" Tag="30" ctype="GameNodeObjectData">
        <Size X="960.0000" Y="640.0000" />
        <Children>
          <AbstractNodeData Name="Image_bg" Visible="False" ActionTag="582986920" Tag="31" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="-32.0000" RightMargin="-32.0000" TopMargin="13.0000" BottomMargin="13.0000" Scale9Width="1024" Scale9Height="615" ctype="ImageViewObjectData">
            <Size X="1024.0000" Y="614.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="480.0000" Y="320.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.5000" />
            <PreSize X="1.0667" Y="0.9594" />
            <FileData Type="Normal" Path="background/bg8.jpg" Plist="" />
          </AbstractNodeData>
          <AbstractNodeData Name="Image_scene_name" ActionTag="-1795463985" Tag="32" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" RightMargin="812.0000" BottomMargin="587.0000" Scale9Width="148" Scale9Height="53" ctype="ImageViewObjectData">
            <Size X="148.0000" Y="53.0000" />
            <AnchorPoint ScaleY="1.0000" />
            <Position Y="640.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition Y="1.0000" />
            <PreSize X="0.1542" Y="0.0828" />
            <FileData Type="Normal" Path="taskscene/ts_scene_name.png" Plist="" />
          </AbstractNodeData>
          <AbstractNodeData Name="Panel_main" ActionTag="179038165" Tag="33" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="56.2480" RightMargin="53.7520" TopMargin="95.6000" BottomMargin="44.4000" TouchEnable="True" BackColorAlpha="102" ColorAngle="90.0000" ctype="PanelObjectData">
            <Size X="850.0000" Y="500.0000" />
            <Children>
              <AbstractNodeData Name="CheckBox_principal_task" ActionTag="2025236163" Tag="34" IconVisible="False" VerticalEdge="BothEdge" LeftMargin="201.0612" RightMargin="506.9388" BottomMargin="438.0000" TouchEnable="True" CheckedState="True" ctype="CheckBoxObjectData">
                <Size X="142.0000" Y="62.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="1.0000" />
                <Position X="272.0612" Y="500.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.3201" Y="1.0000" />
                <PreSize X="0.1671" Y="0.1240" />
                <NormalBackFileData Type="Normal" Path="taskscene/ts_principal_task_normal.png" Plist="" />
                <DisableBackFileData Type="Default" Path="Default/CheckBox_Disable.png" Plist="" />
                <NodeNormalFileData Type="Normal" Path="taskscene/ts_principal_task_seclect.png" Plist="" />
                <NodeDisableFileData Type="Default" Path="Default/CheckBoxNode_Disable.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="CheckBox_everyday_task" ActionTag="869956444" Tag="35" IconVisible="False" VerticalEdge="BothEdge" LeftMargin="48.0690" RightMargin="660.9310" BottomMargin="436.0000" TouchEnable="True" CheckedState="True" ctype="CheckBoxObjectData">
                <Size X="141.0000" Y="64.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="1.0000" />
                <Position X="118.5690" Y="500.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.1395" Y="1.0000" />
                <PreSize X="0.1659" Y="0.1280" />
                <NormalBackFileData Type="Normal" Path="taskscene/ts_everyday_task_normal.png" Plist="" />
                <DisableBackFileData Type="Default" Path="Default/CheckBox_Disable.png" Plist="" />
                <NodeNormalFileData Type="Normal" Path="taskscene/ts_everyday_task_seclect.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="Panel_task" ActionTag="424997123" VisibleForFrame="False" Tag="37" IconVisible="False" HorizontalEdge="BothEdge" LeftMargin="80.0000" RightMargin="80.0000" TopMargin="88.4372" BottomMargin="286.5628" TouchEnable="True" BackColorAlpha="102" ComboBoxIndex="1" ColorAngle="90.0000" ctype="PanelObjectData">
                <Size X="690.0000" Y="125.0000" />
                <Children>
                  <AbstractNodeData Name="Image_stuff" ActionTag="-1440805094" Tag="38" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="BothEdge" LeftMargin="15.0000" RightMargin="571.6788" TopMargin="11.5000" BottomMargin="11.5000" Scale9Width="94" Scale9Height="102" ctype="ImageViewObjectData">
                    <Size X="94.0000" Y="102.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="62.0000" Y="62.5000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.1034" Y="0.5000" />
                    <PreSize X="0.1362" Y="0.8160" />
                    <FileData Type="Normal" Path="taskscene/ts_stuff.png" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Text_task_name" ActionTag="1403400031" Tag="39" IconVisible="False" LeftMargin="119.1925" RightMargin="170.8075" TopMargin="15.9555" BottomMargin="85.0445" IsCustomSize="True" FontSize="24" LabelText="Text Label" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ShadowEnabled="True" ctype="TextObjectData">
                    <Size X="400.0000" Y="24.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="319.1925" Y="97.0445" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.4626" Y="0.7764" />
                    <PreSize X="0.5797" Y="0.1920" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="77" G="77" B="77" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Text_task_content" ActionTag="-653970126" Tag="40" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="167.7757" RightMargin="122.2242" TopMargin="48.3253" BottomMargin="52.6747" IsCustomSize="True" FontSize="24" LabelText="完成关卡第十一章，卢哥很生气     " ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ShadowEnabled="True" ctype="TextObjectData">
                    <Size X="400.0000" Y="24.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="367.7700" Y="64.6750" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5330" Y="0.5174" />
                    <PreSize X="0.5797" Y="0.1920" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="77" G="77" B="77" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Text_task_prize" ActionTag="906953254" Tag="44" IconVisible="False" VerticalEdge="BothEdge" LeftMargin="118.6710" RightMargin="499.3290" TopMargin="83.0000" BottomMargin="18.0000" IsCustomSize="True" FontSize="24" LabelText="奖励：" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ShadowEnabled="True" ctype="TextObjectData">
                    <Size X="72.0000" Y="24.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="154.6710" Y="30.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="0" />
                    <PrePosition X="0.2242" Y="0.2400" />
                    <PreSize X="0.0000" Y="0.0000" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="77" G="77" B="77" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Text_task_prize_1" ActionTag="-329957905" Tag="41" IconVisible="False" VerticalEdge="BothEdge" LeftMargin="206.0447" RightMargin="384.9553" TopMargin="84.0000" BottomMargin="19.0000" IsCustomSize="True" FontSize="22" LabelText="X99999999" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ShadowEnabled="True" ctype="TextObjectData">
                    <Size X="99.0000" Y="22.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="255.5447" Y="30.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="165" B="0" />
                    <PrePosition X="0.3704" Y="0.2400" />
                    <PreSize X="0.0000" Y="0.0000" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="77" G="77" B="77" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Text_task_prize_2" ActionTag="1815680965" Tag="42" IconVisible="False" VerticalEdge="BothEdge" LeftMargin="335.1113" RightMargin="123.8887" TopMargin="84.0000" BottomMargin="19.0000" IsCustomSize="True" FontSize="22" LabelText="初级突破果实-物理攻击" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ShadowEnabled="True" ctype="TextObjectData">
                    <Size X="231.0000" Y="22.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="450.6113" Y="30.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="165" B="0" />
                    <PrePosition X="0.6531" Y="0.2400" />
                    <PreSize X="0.0000" Y="0.0000" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="77" G="77" B="77" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Image_task_prize_type_1" ActionTag="1251608472" Tag="47" IconVisible="False" VerticalEdge="BothEdge" LeftMargin="166.1513" RightMargin="478.8487" TopMargin="73.5000" BottomMargin="8.5000" Scale9Width="45" Scale9Height="43" ctype="ImageViewObjectData">
                    <Size X="45.0000" Y="43.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="188.6513" Y="30.0000" />
                    <Scale ScaleX="0.7000" ScaleY="0.7000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.2734" Y="0.2400" />
                    <PreSize X="0.0652" Y="0.3440" />
                    <FileData Type="Normal" Path="common/gold.png" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Image_task_prize_type_2" ActionTag="-1616551128" Tag="48" IconVisible="False" VerticalEdge="BothEdge" LeftMargin="299.0445" RightMargin="345.9555" TopMargin="73.5000" BottomMargin="8.5000" Scale9Width="45" Scale9Height="43" ctype="ImageViewObjectData">
                    <Size X="45.0000" Y="43.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="321.5445" Y="30.0000" />
                    <Scale ScaleX="0.7000" ScaleY="0.7000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.4660" Y="0.2400" />
                    <PreSize X="0.0652" Y="0.3440" />
                    <FileData Type="Normal" Path="common/gold.png" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Text_task_rate" ActionTag="-1706695098" Tag="43" IconVisible="False" LeftMargin="578.5797" RightMargin="1.4203" TopMargin="6.6960" BottomMargin="98.3040" IsCustomSize="True" FontSize="20" LabelText="99999/99999" HorizontalAlignmentType="HT_Right" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="110.0000" Y="20.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="633.5797" Y="108.3040" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.9182" Y="0.8664" />
                    <PreSize X="0.0000" Y="0.0000" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Image_get" ActionTag="1529112290" Tag="45" IconVisible="False" HorizontalEdge="RightEdge" VerticalEdge="BothEdge" LeftMargin="573.0297" RightMargin="10.0000" TopMargin="10.0000" BottomMargin="10.0000" Scale9Width="112" Scale9Height="105" ctype="ImageViewObjectData">
                    <Size X="112.0000" Y="105.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="624.0000" Y="62.5000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.9116" Y="0.5000" />
                    <PreSize X="0.1623" Y="0.8400" />
                    <FileData Type="Normal" Path="taskscene/ts_get.png" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Button_go_to" ActionTag="-1782018921" Tag="46" IconVisible="False" HorizontalEdge="RightEdge" VerticalEdge="BothEdge" LeftMargin="566.1683" RightMargin="8.0000" TopMargin="50.5000" BottomMargin="25.5000" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="86" Scale9Height="27" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                    <Size X="116.0000" Y="49.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="624.0000" Y="50.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.9046" Y="0.4000" />
                    <PreSize X="0.1681" Y="0.3920" />
                    <TextColor A="255" R="65" G="65" B="70" />
                    <DisabledFileData Type="Default" Path="Default/Button_Disable.png" Plist="" />
                    <NormalFileData Type="Normal" Path="taskscene/ts_go_to_btn.png" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="425.0000" Y="349.0628" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.6981" />
                <PreSize X="0.8118" Y="0.2500" />
                <SingleColor A="255" R="150" G="200" B="255" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
              <AbstractNodeData Name="ScrollView_task" Visible="False" ActionTag="-2054479353" Tag="36" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" TopMargin="65.0000" BottomMargin="15.0000" TouchEnable="True" ClipAble="True" BackColorAlpha="102" ComboBoxIndex="1" ColorAngle="90.0000" IsBounceEnabled="True" ScrollDirectionType="Vertical" ctype="ScrollViewObjectData">
                <Size X="850.0000" Y="420.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="425.0000" Y="225.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.4500" />
                <PreSize X="1.0000" Y="0.8400" />
                <SingleColor A="255" R="255" G="150" B="100" />
                <FirstColor A="255" R="255" G="150" B="100" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
                <InnerNodeSize Width="850" Height="420" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="481.2480" Y="294.4000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5013" Y="0.4600" />
            <PreSize X="0.8854" Y="0.7813" />
            <SingleColor A="255" R="150" G="200" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="Panel_prize_mask" ActionTag="1756779320" Tag="144" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="-88.0000" RightMargin="-88.0000" TopMargin="-64.0000" BottomMargin="-64.0000" TouchEnable="True" BackColorAlpha="76" ComboBoxIndex="1" ColorAngle="90.0000" ctype="PanelObjectData">
            <Size X="1136.0000" Y="768.0000" />
            <Children>
              <AbstractNodeData Name="Image_stuff" ActionTag="-655524792" Tag="146" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="528.0000" RightMargin="528.0000" TopMargin="344.0000" BottomMargin="344.0000" Scale9Width="80" Scale9Height="80" ctype="ImageViewObjectData">
                <Size X="80.0000" Y="80.0000" />
                <Children>
                  <AbstractNodeData Name="Text_num" ActionTag="920795865" Tag="147" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="-20.0000" TopMargin="60.0000" IsCustomSize="True" FontSize="20" LabelText="99999999" HorizontalAlignmentType="HT_Right" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="80.0000" Y="20.0000" />
                    <AnchorPoint ScaleX="1.0000" />
                    <Position X="80.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="0" />
                    <PrePosition X="1.0000" />
                    <PreSize X="0.0000" Y="0.0000" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Text_name" ActionTag="-1462272537" Tag="148" IconVisible="False" HorizontalEdge="BothEdge" LeftMargin="-8.0000" RightMargin="-8.0000" TopMargin="89.0000" BottomMargin="-25.0000" IsCustomSize="True" FontSize="16" LabelText="金币金币金币&#xA;&#xA;" HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="96.0000" Y="48.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="1.0000" />
                    <Position X="40.0000" Y="-9.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="-0.1125" />
                    <PreSize X="0.0000" Y="0.0000" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="568.0000" Y="384.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5000" />
                <PreSize X="0.0704" Y="0.1042" />
                <FileData Type="Normal" Path="emailllayer/el_stuff.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="Image_prize" ActionTag="-113841637" Tag="145" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="188.0000" RightMargin="188.0000" TopMargin="264.0000" BottomMargin="264.0000" Scale9Width="760" Scale9Height="240" ctype="ImageViewObjectData">
                <Size X="760.0000" Y="240.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="568.0000" Y="384.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5000" />
                <PreSize X="0.6690" Y="0.3125" />
                <FileData Type="Normal" Path="emailllayer/el_prize_bg.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="Image_congratulation" ActionTag="-1861967878" Tag="149" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="443.4999" RightMargin="443.5001" TopMargin="149.2007" BottomMargin="546.7993" Scale9Width="249" Scale9Height="72" ctype="ImageViewObjectData">
                <Size X="249.0000" Y="72.0000" />
                <AnchorPoint ScaleX="0.5383" ScaleY="0.6031" />
                <Position X="577.5424" Y="590.2080" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5084" Y="0.7685" />
                <PreSize X="0.3276" Y="0.1398" />
                <FileData Type="Normal" Path="emailllayer/el_congratulation.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="Text_text" ActionTag="-274278303" Tag="150" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="243.0000" RightMargin="243.0000" TopMargin="522.6000" BottomMargin="215.4000" IsCustomSize="True" FontSize="24" LabelText="感觉自己的背包越来越重了，加油！" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="650.0000" Y="30.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="568.0000" Y="230.4000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.3000" />
                <PreSize X="0.8553" Y="0.0583" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="Button_confirm" ActionTag="1024053595" Tag="151" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="494.5006" RightMargin="494.4994" TopMargin="566.0004" BottomMargin="137.9996" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="117" Scale9Height="42" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="147.0000" Y="64.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="568.0000" Y="170.0352" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.2214" />
                <PreSize X="0.1934" Y="0.1243" />
                <TextColor A="255" R="65" G="65" B="70" />
                <DisabledFileData Type="Default" Path="Default/Button_Disable.png" Plist="" />
                <PressedFileData Type="Normal" Path="emailllayer/el_confirmbtn.png" Plist="" />
                <NormalFileData Type="Normal" Path="emailllayer/el_confirmbtn.png" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="480.0000" Y="320.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.5000" />
            <PreSize X="1.1833" Y="1.2000" />
            <SingleColor A="255" R="0" G="0" B="0" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
        </Children>
      </ObjectData>
    </Content>
  </Content>
</GameProjectFile>